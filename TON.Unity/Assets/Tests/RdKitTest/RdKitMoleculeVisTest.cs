using Alchemy.Inspector;
using GraphMolWrap;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace TON.Tests.RdKitTest
{
    public class RdKitMoleculeVisTest : MonoBehaviour
    {
        public GameObject atomPrefab; // Prefab for the atom (sphere)
        public GameObject bondPrefab; // Prefab for the bond (line renderer)

        public string MoleculeSmiles = "CCN(CC)C(=O)[C@H]1CN([C@@H]2Cc3c[nH]c4c3c(ccc4)C2=C1)C"; //LSD

        private ROMol mol;
        private GameObject moleculeObject;

        private Dictionary<string, Color> atomColors = new Dictionary<string, Color>()
    {
        { "C", Color.gray }, // Carbon
        { "H", Color.white }, // Hydrogen
        { "O", Color.red },   // Oxygen
        { "N", Color.blue },  // Nitrogen
        { "Cl", Color.green }, // Chlorine
        // Add other elements as needed
    };

        private Dictionary<string, float> atomSizes = new Dictionary<string, float>()
    {
        { "C", 0.35f }, // Carbon
        { "H", 0.25f }, // Hydrogen
        { "O", 0.55f }, // Oxygen
        { "N", 0.45f }, // Nitrogen
        { "Cl", 0.6f } // Chlorine
        // Add other elements as needed
    };

        [Button]
        public void VisualizeMolecule3D()
        {
            CreateMolecule();
            if (mol.getNumConformers() == 0)
            {
                DistanceGeom.EmbedMolecule(mol);
            }

            VisualizeMolecule(is3D: true);
        }

        [Button]
        public void VisualizeMolecule2D()
        {
            CreateMolecule();
            mol.compute2DCoords();
            VisualizeMolecule(is3D: false);
        }

        [Button]
        public void MolToInchi()
        {
            print(RDKFuncs.MolToInchi(mol, new ExtraInchiReturnValues()));
            print(RDKFuncs.MolToInchiKey(mol));
        }

        private void CreateMolecule()
        {
            mol = RWMol.MolFromSmiles(MoleculeSmiles);
            if (mol == null)
            {
                Debug.LogError("Failed to create molecule from SMILES");
                return;
            }

            mol = mol.addHs(explicitOnly: true);
        }

        private void VisualizeMolecule(bool is3D)
        {
            Conformer conf = mol.getConformer();
            uint numAtoms = mol.getNumAtoms();

            Dictionary<uint, GameObject> atomObjects = new Dictionary<uint, GameObject>();

            if (moleculeObject != null)
            {
                Destroy(moleculeObject);
            }
            string dimensionString = is3D ? "3D" : "2D";
            moleculeObject = new GameObject($"Molecule_{mol.MolToSmiles()}_{dimensionString}");
            moleculeObject.transform.position = Vector3.zero;

            for (uint i = 0; i < numAtoms; i++)
            {
                var atom = mol.getAtomWithIdx(i);
                var pos = conf.getAtomPos(i);

                Vector3 atomPosition;

                if (is3D)
                {
                    atomPosition = new Vector3((float)pos.x, (float)pos.y, (float)pos.z);
                }
                else
                {
                    atomPosition = new Vector3((float)pos.x, (float)pos.y, 0); // Set Z to 0 for 2D
                }

                string element = atom.getSymbol();
                GameObject atomObject = Instantiate(atomPrefab, atomPosition, Quaternion.identity);
                atomObject.transform.parent = moleculeObject.transform;
                atomObject.name = $"{element}_{i}";

                if (atomColors.ContainsKey(element))
                {
                    atomObject.GetComponent<Renderer>().material.color = atomColors[element];
                }

                if (atomSizes.ContainsKey(element))
                {
                    atomObject.transform.localScale = Vector3.one * atomSizes[element];
                }

                atomObjects[i] = atomObject;
            }

            for (uint i = 0; i < numAtoms; i++)
            {
                var atom = mol.getAtomWithIdx(i);
                var bonds = atom.getBonds();
                foreach (var bond in bonds)
                {
                    uint beginIdx = bond.getBeginAtomIdx();
                    uint endIdx = bond.getEndAtomIdx();

                    Vector3 startPos = atomObjects[beginIdx].transform.position;
                    Vector3 endPos = atomObjects[endIdx].transform.position;

                    GameObject bondObject = Instantiate(bondPrefab);
                    bondObject.transform.parent = moleculeObject.transform;
                    LineRenderer lineRenderer = bondObject.GetComponent<LineRenderer>();
                    lineRenderer.positionCount = 2;
                    lineRenderer.SetPosition(0, startPos);
                    lineRenderer.SetPosition(1, endPos);

                    if (bond.getBondType() == Bond.BondType.DOUBLE)
                    {
                        lineRenderer.widthMultiplier *= 5;
                    }
                    else if (bond.getBondType() == Bond.BondType.TRIPLE)
                    {
                        lineRenderer.widthMultiplier *= 8;
                    }
                    else if (bond.getBondType() == Bond.BondType.AROMATIC)
                    {
                        lineRenderer.widthMultiplier *= 3;
                    }
                }
            }
        }
    }
}

