using GraphMolWrap;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using static GraphMolWrap.RDKit;

namespace TON.Tests.RdKitTest
{
    public class RdKitTest : MonoBehaviour
    {
        void Start()
        {
            string smiles = "CCO"; // Ethanol
            RWMol mol = RDKFuncs.SmilesToMol(smiles);
            if (mol != null)
            {
                Debug.Log("Molecule created: " + mol);
            }
            else
            {
                Debug.Log("Failed to create molecule from SMILES");
            }
        }
    }
}
