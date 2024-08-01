from rdkit import Chem
from rdkit.Chem import Draw
from rdkit.Chem.rdDistGeom import EmbedMolecule

mol = Chem.MolFromSmiles("C1CC2=C3C(=CC=C2)C(=CN3C1)[C@H]4[C@@H](C(=O)NC4=O)C5=CNC6=CC=CC=C65")
print(mol.GetNumConformers())
EmbedMolecule(mol)
print(mol.GetNumConformers())