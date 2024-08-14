import pandas as pd
import numpy as np
import os

ki_db = pd.read_csv(os.path.join("..", "res", "PDPS", "KiDatabase.csv"))
unique_receptors = ki_db["Name"].unique()
unique_receptors.sort()
##print(len(unique_receptors.tolist()))

ki_db_human = ki_db[ki_db["species"].str.lower() == "human"]
unique_human_receptors = ki_db_human["Name"].unique()
unique_human_receptors.sort()
##print(unique_human_receptors)

##print(ki_db_human[" Ligand Name"].unique().tolist())

# substance_name = "lsd"
# substance_name = "DMT,5-MeO".lower()
# substance_filter = ki_db_human[" Ligand Name"].str.lower() == (substance_name)
# substance_filter = ki_db_human[" Ligand Name"].str.contains(substance_name, case=False)
##substance_df = ki_db_human[substance_filter][["Name"," Ligand Name", "ki Val"]]
# substance_df = ki_db_human[substance_filter][["Name", "ki Val"]]
# substance_df = substance_df[substance_df["ki Val"] < 10000]
# print(substance_df.groupby("Name").mean())
##print(substance_df)

##receptor_name = "cannabi"
##receptor_filter = ki_db_human["Name"].str.contains(receptor_name, case=False)
##receptor_df = ki_db_human[receptor_filter][["Name"," Ligand Name", "ki Val"]]
##print(receptor_df[" Ligand Name"].unique().tolist())
##print(receptor_df["Name"].unique())

# no_bracket_filter = ~(ki_db_human[" Ligand Name"].str.contains("[", regex=False))
# short_filter = ki_db_human[" Ligand Name"].apply(lambda x: len(x) < 20)
# short_ligand_db = ki_db_human[no_bracket_filter & short_filter]
# uniqueLigands = short_ligand_db[" Ligand Name"].unique()
# with open('KiDBUniqueShortLigands.csv', 'w', encoding='utf-8') as f:
#     np.savetxt(f, uniqueLigands, delimiter=';', fmt='%s', newline=';')

uniqueReceptors = ki_db_human["Name"].unique()
with open('KiDBUniqueReceptors.csv', 'w', encoding='utf-8') as f:
    np.savetxt(f, uniqueReceptors, delimiter=';', fmt='%s', newline=';')




