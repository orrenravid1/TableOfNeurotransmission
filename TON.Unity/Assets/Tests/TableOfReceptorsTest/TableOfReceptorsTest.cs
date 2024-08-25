using Alchemy.Inspector;
using System;
using System.Collections.Generic;
using TMPro;
using Unity.VisualScripting;
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
        public bool OverrideName;
    }

    [System.Serializable]
    public class TransmitterSubclass
    {
        public string Name;
        public SubclassTextOrder SubclassTextOrder = SubclassTextOrder.After;
        public List<Receptor> Receptors = new List<Receptor>();
        public bool OverrideName;
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

    [System.Serializable]
    public class ReceptorData
    {
        [ReadOnly]
        public string CompleteReceptorName;
        [ReadOnly]
        public string ReceptorName;
        [ReadOnly]
        public string TransmitterSubclassName;
        [ReadOnly]
        public string TransmitterClassName;
        [ReadOnly]
        public string ChemicalGroupName;

        public ReceptorData(string completeReceptorName, string receptorName, string transmitterSubclassName, string transmitterClassName, string chemicalGroupName)
        {
            CompleteReceptorName = completeReceptorName;
            ReceptorName = receptorName;
            TransmitterSubclassName = transmitterSubclassName;
            TransmitterClassName = transmitterClassName;
            ChemicalGroupName = chemicalGroupName;
        }
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

        private const float padding = 0.6f;

        private GameObject tableParent;

        private Dictionary<string, GameObject> receptorTilesByName = new();
        private Dictionary<string, ReceptorData> receptorDataByName = new();

        private void Start()
        {
            RenderTable();
        }

        private void OnDrawGizmos()
        {
            if (tableParent != null)
            {
                Bounds tableBounds = ComputeBoundingBox(tableParent.transform);
                // Set the color of the Gizmo
                Gizmos.color = Color.green;
                // Draw a wireframe box representing the bounding box
                Gizmos.DrawWireCube(tableBounds.center, tableBounds.size);
            }
        }

        private void RenderTable()
        {
            // (int rows, int columns) = ComputeTableDimensions();
            // (float height, float width) = (rows * initialTileSize, columns * initialTileSize);
            // (float heightScale, float widthScale) = (initialHeight / height, initialWidth / width);
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
            int prevGroupDimRows;
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
                            if (receptor.OverrideName)
                            {
                                tileName = receptor.Name;
                            }
                            else if (transmitterSubclass.OverrideName)
                            {
                                tileName = $"{transmitterSubclass.Name}{receptor.Name}";
                            }
                            else if (transmitterSubclass.SubclassTextOrder == SubclassTextOrder.After)
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
                            string receptorCompleteName = tileName.Replace("\n", string.Empty);
                            tableTile.name = receptorCompleteName;
                            tableTile.transform.position = new Vector3(xCurr, yCurr, 0);
                            tableTile.transform.localScale = tileSize * Vector3.one;
                            tableTile.transform.parent = tableParent.transform;
                            receptorTilesByName[receptorCompleteName] = tableTile;

                            ReceptorDataContainer receptorDataContainer = tableTile.GetComponent<ReceptorDataContainer>();
                            receptorDataContainer.ReceptorData = new ReceptorData(receptorCompleteName, receptor.Name, transmitterSubclass.Name, transmitterClass.Name, group.Name);
                            receptorDataByName[receptorCompleteName] = receptorDataContainer.ReceptorData;

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

            Bounds tableBounds = ComputeBoundingBox(tableParent.transform);
            Vector3 tableSize = tableBounds.size;
            float cameraHeight = Camera.main.orthographicSize * 2;
            float cameraWidth = cameraHeight * Camera.main.aspect;
            float widthScaleFactor = cameraWidth / tableSize.x;
            float heightScaleFator = cameraHeight / tableSize.y;
            float tableScaleFactor = Mathf.Min(widthScaleFactor, heightScaleFator);
            MoveParent(tableParent.transform, tableBounds.center);
            tableParent.transform.localScale *= tableScaleFactor;
            tableParent.transform.position = Vector3.zero;

            Bounds newTableBounds = ComputeBoundingBox(tableParent.transform);
            float sizeWidthDiff = (cameraWidth - newTableBounds.size.x) / 2;
            float sizeHeightDiff = (cameraHeight - newTableBounds.size.y) / 2;
            float paddingWidthReduction = Mathf.Clamp(0, padding, padding - sizeWidthDiff) / newTableBounds.extents.x;
            float paddingHeightReduction = Mathf.Clamp(0, padding, padding - sizeHeightDiff) / newTableBounds.extents.y;

            tableParent.transform.localScale -= Vector3.one * Mathf.Max(paddingWidthReduction, paddingHeightReduction);
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

        private Bounds ComputeBoundingBox(Transform obj)
        {
            Bounds combinedBounds = new Bounds(obj.position, Vector3.zero);
            Renderer objRenderer = obj.GetComponent<Renderer>();

            if (objRenderer != null)
            {
                combinedBounds = objRenderer.bounds;
            }

            foreach (Transform child in obj)
            {
                Bounds childBounds = ComputeBoundingBox(child);
                if (childBounds.size != Vector3.zero)
                {
                    combinedBounds.Encapsulate(childBounds);
                }
            }

            return combinedBounds;
        }

        private void MoveParent(Transform parent, Vector3 newPosition)
        {
            // Create a list to store the original positions of the children
            List<Vector3> originalChildPositions = new List<Vector3>();

            // Iterate through each child and store its position
            foreach (Transform child in parent)
            {
                originalChildPositions.Add(child.position);
            }

            // Move the parent to the new position
            parent.position = newPosition;

            // Reapply the original positions to each child
            int index = 0;
            foreach (Transform child in parent)
            {
                child.position = originalChildPositions[index];
                index++;
            }
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