import pandas as pd

# Read the original CSV file
df = pd.read_csv("../res/ReceptorSpreadsheet/ReceptorSpreadsheet.csv")

# Let's inspect the first few rows to understand the columns (this will be printed in our log)
print("Original CSV columns and first few rows:")
print(df.head())

# Define a mapping dictionary from receptor keywords to updated downstream effects text.
mapping = {
    "nmda": "NMDA receptors (GluN1/GluN2A-D) conduct Ca²⁺ (as well as Na⁺/K⁺) to trigger CaMKII, PKC, and Ras-ERK/MAPK signaling cascades, underlying synaptic plasticity (LTP/LTD).",
    "ampa": "AMPA receptors mediate fast excitatory transmission via Na⁺ influx; Ca²⁺ permeability (in GluA1 homomers) can activate Ca²⁺-dependent signaling for synaptic plasticity, while GluA2-containing receptors primarily depolarize the membrane.",
    "kainate": "Kainate receptors (GluK1-5) are cation channels that depolarize neurons and modulate neurotransmitter release both pre- and postsynaptically, with moderate Ca²⁺ entry influencing signaling.",
    "mglu group i": "Group I mGluRs (mGluR1/5) are Gq/11-coupled, activating PLCβ to generate IP₃ and DAG, releasing Ca²⁺ from intracellular stores and activating PKC, MAPK, and mTOR pathways to enhance excitability and plasticity.",
    "mglu group ii": "Group II mGluRs (mGluR2/3) couple to Gi/o to inhibit adenylate cyclase, reduce cAMP, and open GIRK channels, leading to decreased neurotransmitter release and neuronal inhibition.",
    "mglu group iii": "Group III mGluRs (mGluR4/6/7/8) are Gi/o-coupled, reducing cAMP and suppressing neurotransmitter release; for example, mGluR7 modulates Ca²⁺ influx to provide inhibitory feedback.",
    "gaba_a": "GABA_A receptors are ligand-gated Cl⁻ channels; their activation typically allows Cl⁻ influx, hyperpolarizing mature neurons to produce fast synaptic inhibition, with subunit composition dictating phasic versus tonic effects.",
    "gaba_b": "GABA_B receptors are Gi/o-coupled GPCRs that, upon heterodimerization, inhibit adenylate cyclase, reduce cAMP, open GIRK channels, and inhibit voltage-gated Ca²⁺ channels, resulting in prolonged inhibitory signaling.",
    "glycine": "Glycine receptors are Cl⁻ channels mediating rapid inhibitory neurotransmission in the spinal cord, brainstem, and retina by causing hyperpolarization.",
    "nACh (muscle)": "Muscle-type nicotinic ACh receptors are pentameric cation channels that mediate neuromuscular transmission; their activation depolarizes the muscle endplate to trigger contraction.",
    "nACh (α7)": "The homomeric α7 nicotinic receptor is highly permeable to Ca²⁺; its activation triggers CaMKII and CREB signaling, modulating neurotransmitter release and promoting neuroprotection.",
    "nACh (α4β2)": "The α4β2 nicotinic receptor, abundant in the brain, mediates moderate Na⁺ influx and modulates neurotransmitter release (e.g. dopamine), impacting cognitive and reward pathways.",
    "muscarinic (m1)": "M₁ receptors, via Gq coupling, activate PLC to produce IP₃ and DAG, raising intracellular Ca²⁺ and inhibiting M-type K⁺ channels, thereby enhancing neuronal excitability and cognitive function.",
    "muscarinic (m2)": "M₂ receptors are Gi/o-coupled; their activation inhibits adenylate cyclase, reduces cAMP, and opens GIRK channels, leading to hyperpolarization (notably slowing heart rate).",
    "muscarinic (m3)": "M₃ receptors couple via Gq to stimulate PLC, leading to IP₃-mediated Ca²⁺ release that causes smooth muscle contraction (e.g., bronchoconstriction, GI peristalsis) and glandular secretion.",
    "muscarinic (m4)": "M₄ receptors are Gi/o-coupled and primarily decrease neurotransmitter release, modulating dopaminergic signaling in basal ganglia to affect motor control.",
    "muscarinic (m5)": "M₅ receptors, although less understood, are Gq-coupled in the CNS and vasculature; they raise intracellular Ca²⁺ to modulate dopaminergic and cerebrovascular responses.",
    "dopamine (d1)": "D₁ receptors, coupling to Gs/olf, stimulate adenylate cyclase to increase cAMP, which activates PKA to enhance L-type Ca²⁺ channel activity and neuronal excitability, supporting reward and motor functions.",
    "dopamine (d2)": "D₂ receptors are Gi/o-coupled, inhibiting adenylate cyclase, reducing cAMP, opening GIRK channels, and inhibiting voltage-gated Ca²⁺ channels, resulting in decreased neurotransmitter release.",
    "cannabinoid (cb1)": "CB₁ receptors couple to Gi/o and are primarily presynaptic; their activation inhibits voltage-gated Ca²⁺ channels, opens GIRK channels, and reduces cAMP, suppressing neurotransmitter release.",
    "serotonin (5-ht3)": "5-HT₃ receptors are ionotropic cation channels that allow Na⁺ and some Ca²⁺ influx, leading to rapid depolarization and fast excitatory neurotransmission.",
    "serotonin (5-ht1a)": "5-HT₁A receptors are Gi/o-coupled, activating GIRK channels and inhibiting Ca²⁺ channels, resulting in hyperpolarization and reduced neuronal firing, contributing to anxiolytic effects.",
    "serotonin (5-ht2a)": "5-HT₂A receptors, via Gq coupling, activate PLC to raise intracellular Ca²⁺ and PKC activity, thereby modulating ion channels, gene expression, and perceptual processes.",
    "adrenergic (α1)": "α₁ receptors are Gq-coupled, activating PLC to increase IP₃/Ca²⁺ and PKC activity, leading to smooth muscle contraction and vasoconstriction.",
    "adrenergic (α2)": "α₂ receptors couple to Gi/o, inhibiting adenylate cyclase, reducing cAMP, opening GIRK channels, and inhibiting Ca²⁺ channels, resulting in decreased neurotransmitter release and sedation.",
    "adrenergic (β1)": "β₁ receptors, through Gs coupling, increase cAMP to activate PKA and enhance Ca²⁺ influx, thereby boosting cardiac contractility and heart rate.",
    "adrenergic (β2)": "β₂ receptors are Gs-coupled; their activation raises cAMP to cause smooth muscle relaxation (bronchodilation, vasodilation) and modulate neurotransmitter release.",
    "adenosine (a1)": "A₁ adenosine receptors, via Gi/o coupling, inhibit adenylate cyclase, reduce cAMP, open GIRK channels, and inhibit Ca²⁺ channels, leading to neuronal inhibition and slowed AV conduction.",
    "adenosine (a2a)": "A₂A receptors are Gs-coupled; their activation stimulates adenylate cyclase to increase cAMP, enhancing neurotransmitter release and causing vasodilation in coronary vessels.",
    "p2x7": "P2X₇ receptors are ATP-gated ion channels that, upon prolonged activation, form large pores, allowing Ca²⁺ influx and triggering inflammasome activation, cytokine release, and cell death.",
    "p2y (p2y1)": "P2Y₁ receptors are Gq-coupled; their activation by ADP stimulates PLC, leading to IP₃-mediated Ca²⁺ release and platelet aggregation.",
    "histamine (h1)": "H₁ receptors are Gq-coupled, activating PLC to increase IP₃/Ca²⁺ and PKC activity, which causes smooth muscle contraction, endothelial NO release, and neuronal excitation.",
    "opioid (μ)": "μ-opioid receptors are Gi/o-coupled; they inhibit adenylate cyclase, reduce cAMP, open GIRK channels, and inhibit Ca²⁺ channels, producing potent analgesia and sedation.",
    "opioid (δ)": "δ-opioid receptors, similar to μ, are Gi/o-coupled and inhibit AC and Ca²⁺ channels, leading to analgesia and mood modulation.",
    "opioid (κ)": "κ-opioid receptors couple to Gi/o to inhibit AC and Ca²⁺ channels, resulting in analgesia, dysphoria, and altered dopamine release.",
    "galanin": "Galanin receptors can be Gi/o or Gq-coupled; typically, GAL₁/GAL₃ mediate inhibitory effects via Gi (reducing cAMP and hyperpolarizing neurons), while GAL₂ (Gq) increases IP₃/Ca²⁺ to modulate hormone release and excitability.",
    "tachykinin (nk1)": "NK₁ receptors are Gq-coupled; their activation by substance P stimulates PLC, raising IP₃/Ca²⁺ and PKC activity to mediate pain transmission and inflammatory responses.",
    "crf (crf1)": "CRF₁ receptors are primarily Gs-coupled, stimulating adenylate cyclase to increase cAMP, which triggers ACTH release and stress-related responses in the HPA axis.",
    "vasopressin (v1a)": "V1a receptors are Gq-coupled; activation increases IP₃/Ca²⁺ to induce vascular smooth muscle contraction, leading to vasoconstriction and increased blood pressure.",
    "oxytocin": "Oxytocin receptors are Gq-coupled, activating PLC to elevate IP₃ and Ca²⁺ in myoepithelial and neuronal cells, thereby driving uterine contractions and milk ejection.",
    "melatonin (mt1)": "MT₁ receptors are Gi/o-coupled, inhibiting adenylate cyclase to reduce cAMP and enhancing K⁺ channel activity, contributing to sleep regulation and decreased neuronal firing.",
    "melatonin (mt2)": "MT₂ receptors are Gi/o-coupled; their activation reduces cAMP and modulates circadian rhythms by affecting phase shifts in the suprachiasmatic nucleus.",
    "leptin": "Leptin receptors (Ob-Rb) activate JAK2/STAT3, PI3K, and MAPK pathways, leading to transcriptional changes that suppress appetite and increase energy expenditure.",
    "neurotensin": "Neurotensin receptors (e.g. NTS1) are primarily Gq-coupled, activating PLC to raise IP₃/Ca²⁺ and cAMP, modulating dopaminergic signaling and contributing to antipsychotic effects.",
    "kisspeptin": "Kisspeptin receptors (Kiss1R) are Gq-coupled, activating PLC to increase IP₃/Ca²⁺ and PKC, triggering GnRH release essential for puberty and fertility.",
    "cgrp": "CGRP receptors (CLR/RAMP1 complex) are primarily Gs-coupled, stimulating adenylate cyclase to raise cAMP, leading to vasodilation and sensitization of pain pathways.",
    "sigma-1": "Sigma-1 receptors act as ER chaperones that modulate Ca²⁺ signaling between the ER and mitochondria, thereby influencing ion channel function and neuroprotection.",
    "imidazoline (i1)": "I₁ receptors likely couple to Gq/11, activating PLC and MAPK cascades to modulate ion channels in the RVLM, reducing sympathetic tone and blood pressure.",
    "imidazoline (i2)": "I₂ receptors are associated with monoamine oxidases and modulate enzyme activity, potentially influencing NMDA receptor signaling and contributing to analgesia.",
    "imidazoline (i3)": "I₃ receptors in pancreatic β-cells modulate ATP-sensitive K⁺ channels and increase intracellular Ca²⁺ to promote insulin secretion.",
    "sgc": "Soluble guanylyl cyclase (sGC) is activated by NO binding to its heme, converting GTP to cGMP; the increase in cGMP activates PKG which modulates ion channels to cause vasodilation.",
    "orexin": "Orexin receptors (OX1R/OX2R) primarily couple to Gq, increasing IP₃/Ca²⁺ to excite neurons in arousal pathways, with OX2R also engaging Gi for modulatory effects.",
    "mc": "Melanocortin receptors (MC1R-MC5R) are Gs-coupled; their activation elevates cAMP with effects ranging from pigmentation (MC1R) to appetite suppression (MC4R) and steroidogenesis (MC2R).",
    "bombesin": "Bombesin receptors (BB1/BB2/BB3) are typically Gq-coupled, activating PLC to elevate IP₃/Ca²⁺ and drive smooth muscle contraction, secretion, and modulation of feeding circuits.",
    "bradykinin": "Bradykinin receptors (B1 and B2) are Gq-coupled; B2 mediates acute responses via increased IP₃/Ca²⁺ causing vasodilation and pain, while B1 is upregulated in inflammation.",
    "npy": "Neuropeptide Y receptors (Y1, Y2, Y4, Y5) are Gi/o-coupled; their activation inhibits adenylate cyclase, reduces cAMP, and diminishes neuronal firing to modulate feeding and stress.",
    "npff": "NPFF receptors (NPFF1/NPFF2) are Gi/o-coupled, inhibiting adenylate cyclase and reducing neuronal excitability, thereby influencing pain modulation and opioid tolerance.",
    "npb/w": "NPB/W receptors (NPBWR1/NPBWR2) are Gi/o-coupled; their activation lowers cAMP and modulates feeding behavior and stress responses through neuronal inhibition.",
    "prrp": "PrRP receptors (GPR10) couple to Gq and Gi/o, increasing Ca²⁺ to stimulate prolactin release and modulating appetite and stress via AC inhibition.",
    "motilin": "Motilin receptors are Gq-coupled; activation leads to PLC-mediated IP₃/Ca²⁺ release in GI smooth muscle, inducing strong contractile activity and promoting motility.",
    "neuromedin u": "Neuromedin U receptors (NMUR1/NMUR2) are Gq-coupled; their activation elevates IP₃/Ca²⁺ to cause smooth muscle contraction peripherally and modulate feeding and stress centrally.",
    "neuropeptide s": "Neuropeptide S receptors (NPSR1) couple to Gs and Gq, raising cAMP and Ca²⁺ to enhance neuronal excitability, thereby promoting wakefulness and anxiolytic effects.",
    "relaxin": "Relaxin receptors (RXFP1-4) have variable coupling: RXFP1/RXFP2 typically increase cAMP to mediate vasodilation and tissue remodeling, while RXFP3/4 decrease cAMP to modulate neuroendocrine functions.",
    "vip": "VIP/PACAP receptors (VPAC1, VPAC2, PAC1) are mainly Gs-coupled (with PAC1 also coupling to Gq), elevating cAMP (and Ca²⁺ via PAC1) to promote smooth muscle relaxation, secretion, circadian regulation, and neuroprotection.",
    "taar": "TAAR receptors (e.g. TAAR1) are primarily Gs-coupled, increasing cAMP to modulate monoamine transporter function and neurotransmitter release, affecting mood and arousal.",
    "prokineticin": "Prokineticin receptors (PROKR1/PROKR2) are Gq-coupled, elevating IP₃/Ca²⁺ to mediate angiogenesis, inflammation, and circadian or neuroendocrine functions.",
    "trk": "Trk receptors (TrkA/TrkB/TrkC) are receptor tyrosine kinases; their activation triggers Ras–MAPK, PI3K–Akt, and PLCγ pathways, promoting neuronal survival, differentiation, and plasticity.",
    "p75": "p75NTR signals via adaptor proteins to activate NF-κB (for survival) or JNK (for apoptosis) and modulates RhoA, influencing neuronal growth and response to injury.",
    "gper": "GPER (G protein-coupled estrogen receptor) couples to Gs, Gi, and β-arrestin, increasing cAMP, activating PI3K/ERK, and modulating ion channel activity for rapid estrogen signaling.",
    "androgen": "Androgen receptors are nuclear receptors that, upon binding testosterone or DHT, regulate gene transcription over a long time scale, indirectly modulating ion channel expression and cellular growth."
}

def update_downstream_effects(row):
    # Get the receptor name from the row; assume the column is named 'Receptor'
    receptor_name = str(row.get("Receptor", "")).lower()
    updated_text = None
    # Try to find a mapping key that is a substring of the receptor name.
    for key, text in mapping.items():
        if key in receptor_name:
            updated_text = text
            break
    # If no key found, leave the original downstream effects text.
    if updated_text is None:
        updated_text = row.get("Downstream Effects", "")
    return updated_text

# Apply the update to the 'Downstream Effects' column
if "Downstream Effects" in df.columns:
    df["Downstream Effects"] = df.apply(update_downstream_effects, axis=1)
else:
    # If the column name differs, try case-insensitive match
    for col in df.columns:
        if col.lower() == "downstream effects":
            df[col] = df.apply(update_downstream_effects, axis=1)
            break

# Write the updated dataframe to a new CSV file.
output_csv_path = "../res/ReceptorSpreadsheet/ReceptorSpreadsheetUpdated.csv"
df.to_csv(output_csv_path, index=False)

print("Updated CSV file saved to:", output_csv_path)
df.head(10)