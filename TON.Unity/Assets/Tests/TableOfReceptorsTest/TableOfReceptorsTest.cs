using Alchemy.Inspector;
using System;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

namespace TON.Tests.TableOfReceptors
{
    public enum SubclassTextOrder
    {
        After,
        NewLine,
        Before
    }

    [System.Serializable]
    public class Receptor
    {
        public string Name;
    }

    [System.Serializable]
    public class TransmitterSubclass
    {
        public string Name;
        public SubclassTextOrder SubclassTextOrder = SubclassTextOrder.After;
        public List<Receptor> Receptors = new List<Receptor>();
    }

    [System.Serializable]
    public class TransmitterClass
    {
        public string Name;
        public Color TransmitterColor = Color.white;
        public List<TransmitterSubclass> TransmitterSubclasses;
    }

    [System.Serializable]
    public class ChemicalGroup : IComparable<ChemicalGroup>
    {
        public string Name;
        public int TableRow;
        public int TableColumn;
        public List<TransmitterClass> TransmitterClasses;

        public int CompareTo(ChemicalGroup other)
        {
            if (TableRow != other.TableRow)
            {
                return TableRow.CompareTo(other.TableRow);
            }
            else
            {
                return TableColumn.CompareTo(other.TableColumn);
            }
        }
    }

    [System.Serializable]
    public class TransmitterClassAndSubClassWrapLength
    {
        public string TransmitterClassName;
        public string TransmitterSubclassName;
        public int WrapLength;
    }

    [DisableAlchemyEditor]
    public class TableOfReceptorsTest : MonoBehaviour
    {
        [SerializeField]
        public GameObject TableTilePrefab;

        public List<ChemicalGroup> ChemicalGroups;
        public List<TransmitterClassAndSubClassWrapLength> WrapLengths;

        private const float initialWidth = 20;
        private const float initialHeight = 10;
        private const float initialJump = 0.95f;
        private const float initialTileSize = 1.0f;

        private const float xInit = -initialWidth / 2;
        private const float yInit = initialHeight / 2;

        private GameObject tableParent;

        private void Start()
        {
            RenderTable();
        }

        private void RenderTable()
        {
            (int rows, int columns) = ComputeTableDimensions();
            (float height, float width) = (rows * initialTileSize, columns * initialTileSize);
            (float heightScale, float widthScale) = (initialHeight / height, initialWidth / width);
            // float scaleFactor = Mathf.Min(heightScale, widthScale);
            float scaleFactor = 0.8f;
            float tileSize = initialTileSize * scaleFactor;
            float jump = initialJump * scaleFactor;

            int i = 0;

            if (tableParent != null)
            {
                Destroy(tableParent);
            }
            tableParent = new GameObject("TableOfNeurotransmission");
            tableParent.transform.position = Vector3.zero;

            // Don't actually need to do this because we do it in ComputeTableDimensions
            ChemicalGroups.Sort();

            float xGroupInit = xInit;
            float yGroupInit = yInit;
            int prevGroupTableRow = 0;
            int prevGroupTableColumn = 0;
            int prevGroupDimRows = 0;
            int prevGroupDimCols = 0;
            int maxPrevGroupDimRows = 0;

            foreach (ChemicalGroup group in ChemicalGroups)
            {
                if (group.TableRow > prevGroupTableRow)
                {
                    xGroupInit = xInit;
                    yGroupInit -= jump * maxPrevGroupDimRows;
                    maxPrevGroupDimRows = 0;
                }
                else if (group.TableColumn > prevGroupTableColumn)
                {
                    xGroupInit += jump * prevGroupDimCols;
                }

                float xCurr = xGroupInit;
                float yCurr = yGroupInit;
                foreach (TransmitterClass transmitterClass in group.TransmitterClasses)
                {
                    foreach (TransmitterSubclass transmitterSubclass in transmitterClass.TransmitterSubclasses)
                    {
                        int tClassTot = 0;
                        foreach (Receptor receptor in transmitterSubclass.Receptors)
                        {
                            string tileName;
                            if (transmitterSubclass.SubclassTextOrder == SubclassTextOrder.After)
                            {
                                tileName = $"{transmitterClass.Name}{transmitterSubclass.Name}{receptor.Name}";
                            }
                            else if (transmitterSubclass.SubclassTextOrder == SubclassTextOrder.NewLine)
                            {
                                tileName = $"{transmitterClass.Name}\n{transmitterSubclass.Name}{receptor.Name}";
                            }
                            else
                            {
                                tileName = $"{receptor.Name}{transmitterClass.Name}{transmitterSubclass.Name}";
                            }

                            GameObject tableTile = Instantiate(TableTilePrefab);
                            tableTile.name = tileName.Replace("\n",string.Empty);
                            tableTile.transform.position = new Vector3(xCurr, yCurr, 0);
                            tableTile.transform.localScale = tileSize * Vector3.one;
                            tableTile.transform.parent = tableParent.transform;
                            SpriteRenderer tileRenderer = GetComponentInChildrenOnly<SpriteRenderer>(tableTile);
                            tileRenderer.color = transmitterClass.TransmitterColor;
                            TextMeshPro textMesh = tableTile.GetComponentInChildren<TextMeshPro>();
                            Color tColor = transmitterClass.TransmitterColor;
                            float Y = 0.2126f * tColor.r + 0.7152f * tColor.g + 0.0722f * tColor.b;
                            if (Y > 0.8f)
                            {
                                textMesh.color = Color.black;
                            }
                            textMesh.text = tileName;
                            i++;
                            tClassTot++;
                            if (i >= GetWrapLength(transmitterClass, transmitterSubclass) && tClassTot < transmitterSubclass.Receptors.Count)
                            {
                                i = 0;
                                xCurr = xGroupInit;
                                yCurr -= jump;
                            }
                            else
                            {
                                xCurr += jump;
                            }
                        }
                        i = 0;
                        yCurr -= jump;
                        xCurr = xGroupInit;
                    }
                }

                prevGroupTableRow = group.TableRow;
                prevGroupTableColumn = group.TableColumn;
                (prevGroupDimRows, prevGroupDimCols) = ComputeGroupDimension(group);
                maxPrevGroupDimRows = Mathf.Max(maxPrevGroupDimRows, prevGroupDimRows);
            }
        }

        private (int, int) ComputeTableDimensions()
        {
            ChemicalGroups.Sort();
            int currGroupRowIdx = 0;
            int currGroupColIdx = 0;
            int totalRows = 0;
            int columnsOfCurrTableRow = 0;
            int maxColumns = 0;
            int maxRowsOfCurrTableRow = 0;
            foreach (var group in ChemicalGroups)
            {
                (int rows, int columns) = ComputeGroupDimension(group);
                if (group.TableRow > currGroupRowIdx)
                {
                    // We are in a new row
                    maxColumns = Mathf.Max(maxColumns, columnsOfCurrTableRow);
                    totalRows += maxRowsOfCurrTableRow;
                }
                else if (group.TableColumn > currGroupColIdx)
                {
                    columnsOfCurrTableRow += columns;
                    maxRowsOfCurrTableRow = Mathf.Max(maxRowsOfCurrTableRow, rows);
                }
                else
                {
                    // We are at the first element
                    columnsOfCurrTableRow = columns;
                    maxRowsOfCurrTableRow = rows;
                }
                maxColumns = Mathf.Max(maxColumns, columnsOfCurrTableRow);
                totalRows += maxRowsOfCurrTableRow;
            }
            return (totalRows, maxColumns);
        }

        private (int, int) ComputeGroupDimension(ChemicalGroup group)
        {
            int totalRows = 0;
            int maxColumns = 0;
            foreach (var transmitterClass in group.TransmitterClasses)
            {
                (int rows, int columns) = ComputeTransmitterClassDimension(transmitterClass);
                totalRows += rows;
                maxColumns = Mathf.Max(maxColumns, columns);
            }
            return (totalRows, maxColumns);
        }

        private (int, int) ComputeTransmitterClassDimension(TransmitterClass transmitterClass)
        {
            int totalRows = 0;
            int maxColumns = 0;
            foreach (var transmitterSubclass in transmitterClass.TransmitterSubclasses)
            {
                (int rows, int columns) = ComputeTransmitterSubclassDimension(transmitterSubclass, transmitterClass);
                totalRows += rows;
                maxColumns = Mathf.Max(maxColumns, columns);
            }
            return (totalRows, maxColumns);
        }

        private (int, int) ComputeTransmitterSubclassDimension(TransmitterSubclass transmitterSubclass, TransmitterClass transmitterClass)
        {
            int wrapLength = GetWrapLength(transmitterClass, transmitterSubclass);
            int numReceptors = transmitterSubclass.Receptors.Count;
            return (numReceptors / wrapLength, numReceptors < wrapLength ? numReceptors : wrapLength);
        }

        private int GetWrapLength(TransmitterClass transmitterClass, TransmitterSubclass transmitterSubclass)
        {
            foreach (var wrapLength in WrapLengths)
            {
                if (wrapLength.TransmitterClassName == transmitterClass.Name && wrapLength.TransmitterSubclassName == transmitterSubclass.Name)
                {
                    return wrapLength.WrapLength;
                }
            }
            return transmitterSubclass.Receptors.Count;
        }

        private T GetComponentInChildrenOnly<T>(GameObject go) where T : Component
        {
            Transform transform = go.transform;
            foreach (Transform child in transform)
            {
                T component = child.GetComponent<T>();
                if (component != null)
                {
                    return component;
                }

                // Recursive search in child's children
                component = GetComponentInChildrenRecursive<T>(child);
                if (component != null)
                {
                    return component;
                }
            }
            return null;
        }

        // Recursive helper method to search deeper into the hierarchy
        private T GetComponentInChildrenRecursive<T>(Transform parent) where T : Component
        {
            foreach (Transform child in parent)
            {
                T component = child.GetComponent<T>();
                if (component != null)
                {
                    return component;
                }

                // Recursively search in child's children
                component = GetComponentInChildrenRecursive<T>(child);
                if (component != null)
                {
                    return component;
                }
            }
            return null;
        }
    }
}