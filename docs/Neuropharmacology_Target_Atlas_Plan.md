# Neuropharmacology Target Atlas
## From a patient-readable drug-target map to mechanistic simulation and phenomenology

**Status:** Working architecture and implementation plan  
**Scope:** Human neuropharmacology first, with later extension to mechanistic simulation, learned models, and phenomenology  
**Date:** August 2026

---

## 1. Project intention

The project begins from a simple visualization problem:

> Can we build a stable, visually learnable map of neurotransmission and then show, for any selected drug or set of drugs, where and how that drug acts?

The original prototype approached this as a "periodic table of neurotransmitter receptors." Receptor families occupied stable visual locations, and drug classes were overlaid on the table. Examples included:

- caffeine as an antagonist in the adenosine region,
- dissociative anesthetics at NMDA receptors,
- opioids at the mu-opioid receptor,
- classic tryptaminergic psychedelics at 5-HT2A,
- atypical antipsychotics across several serotonergic, dopaminergic, histaminergic, and muscarinic regions,
- amphetamines as broadly increasing dopamine and norepinephrine signaling.

That prototype captured the central interaction metaphor well: **the map stays fixed while pharmacology lights up different parts of it**.

Its main limitation was ontological rather than visual. A receptor-only map cannot directly represent drugs whose primary action is at transporters, enzymes, vesicular machinery, ion channels, or other control points. For example, amphetamine acts directly on monoamine transport machinery but the original visualization had to indicate its effects indirectly by highlighting dopamine and adrenergic receptor families.

The next version should therefore generalize from a **receptor atlas** to a **neuropharmacology target atlas**.

The initial project is still intentionally simple:

1. define the molecular components of neurotransmission that drugs can directly perturb,
2. give those components stable visual addresses,
3. select one or more drugs,
4. display where they act,
5. encode both the strength and kind of interaction,
6. distinguish direct molecular action from downstream consequences,
7. preserve provenance and uncertainty for every displayed claim.

The long-term project then extends this foundation into a causal model:

```text
drug
  -> molecular target
  -> target perturbation
  -> transmitter / intracellular dynamics
  -> cell state
  -> circuit state
  -> physiological / behavioral effects
  -> subjective phenomenology
```

The important architectural decision is that these layers should be **linked but not collapsed**. The first useful product does not require solving downstream signaling or consciousness. It requires a rigorous target ontology and a good drug-target visualization.

---

## 2. Core use cases

### 2.1 Patient and clinician explanation

A clinician could select a medication and use the atlas to explain:

- which neurotransmitter systems it directly acts on,
- which specific molecular targets are involved,
- whether those actions are agonism, antagonism, reuptake inhibition, allosteric modulation, channel block, enzyme inhibition, etc.,
- which targets may plausibly contribute to therapeutic or adverse effects,
- where two medications directly overlap,
- where they influence the same neurotransmitter system by different routes.

The interface should **not** imply that a patient has a quantitatively measured "receptor deficiency" unless such a measurement actually exists. A safer vocabulary is:

- hypothesized systems involved,
- targets affected by this medication,
- pathways influenced,
- evidence-supported mechanisms,
- possible mechanistic overlap.

The atlas is an explanatory model of known pharmacology, not a diagnostic scan of an individual brain.

### 2.2 Education

The atlas should make it possible to learn neuropharmacology spatially.

After repeated use, a person should know roughly where:

- dopamine targets live,
- serotonin targets live,
- glutamate targets live,
- monoamine transporters live,
- GABAergic machinery lives,
- opioid targets live,
- adenosine and purinergic targets live.

The spatial layout therefore has value even when every global X-Y coordinate is not mathematically meaningful.

### 2.3 Drug comparison and polypharmacy

For two or more selected drugs, the system should separate:

1. **direct target overlap**  
   Both drugs act at the same molecular target.

2. **pathway overlap**  
   The drugs act at different targets in the same transmitter or signaling system.

3. **physiological convergence**  
   Different molecular actions converge on the same functional outcome.

4. **pharmacokinetic interaction**  
   One drug changes the exposure of another through metabolism or transport.

Only the first two need to exist in the first version.

### 2.4 Research and model-building

The same database should eventually be machine-readable enough to serve as input to:

- receptor and signaling simulations,
- cellular and network simulations,
- mechanistic knowledge graphs,
- graph neural networks,
- representation learning,
- drug-effect prediction models,
- phenomenology prediction models,
- inverse design of target profiles for desired states.

---

## 3. Design principle: preserve the map, improve the ontology

The periodic-table metaphor is worth preserving because it gives each target a **stable visual address**.

The new design should not force the entire atlas into one globally meaningful Cartesian arrangement if that makes it harder to recognize.

Instead, organize the map as **neurotransmitter-system modules**.

Each module is internally causal and mechanistic.

For example:

```text
                         DOPAMINE

      synthesis         vesicular       receptors        clearance     metabolism

TH -> AADC/DDC -------> VMAT2 -----> D1 D2 D3 D4 D5 ----> DAT -------> MAO / COMT
```

```text
                         SEROTONIN

TPH2 -> AADC/DDC -----> VMAT2 -----> 5-HT1...5-HT7 -----> SERT ------> MAO-A
```

```text
                           GABA

GAD1/2 --------------> VGAT --------> GABA-A / GABA-B ---> GATs -----> ABAT
```

The atlas can then arrange these modules in a visually memorable "periodic table" composition.

### Why this is preferable to a strict global X-Y schema

It gives meaningful local structure:

- left to right can approximately follow synthesis -> storage -> signaling -> clearance,
- receptor subtypes stay grouped,
- transporters and enzymes have obvious homes,
- spatial memory remains intact.

But it does not pretend that the distance between D2 and 5-HT2A has a precise biological meaning.

---

## 4. The targetome: what belongs on the map

The atomic visual object is no longer a receptor. It is a **pharmacologically modifiable molecular target relevant to neurotransmission**.

### 4.1 Receptors

Include:

- GPCRs,
- ligand-gated ion channels,
- receptor complexes,
- receptor subunits where the subunit itself is the pharmacologically meaningful identity,
- nuclear or intracellular receptors when they are explicitly within project scope.

Examples:

- D1-D5,
- 5-HT1A through 5-HT7,
- alpha and beta adrenergic receptors,
- muscarinic receptors,
- nicotinic acetylcholine receptors,
- GABA-A and GABA-B,
- NMDA, AMPA, kainate, delta glutamate receptors,
- metabotropic glutamate receptors,
- opioid receptors,
- cannabinoid receptors,
- histamine receptors,
- adenosine and purinergic receptors,
- neuropeptide receptors.

### 4.2 Plasma-membrane neurotransmitter transporters

These are required in the first version.

#### Monoamines
- DAT - SLC6A3
- NET - SLC6A2
- SERT - SLC6A4

#### GABA
- GAT1 - SLC6A1
- GAT2 - SLC6A13
- GAT3 - SLC6A11
- BGT1 - SLC6A12

#### Glycine
- GlyT1 - SLC6A9
- GlyT2 - SLC6A5

#### Glutamate
- EAAT1 - SLC1A3
- EAAT2 - SLC1A2
- EAAT3 - SLC1A1
- EAAT4 - SLC1A6
- EAAT5 - SLC1A7

#### Choline
- CHT1 - SLC5A7

#### Secondary / extrasynaptic monoamine and purine handling
These should probably be present but visually distinguished from canonical synaptic reuptake:

- PMAT - SLC29A4
- OCT1/2/3 - SLC22A1/SLC22A2/SLC22A3
- ENT1/2 - SLC29A1/SLC29A2

### 4.3 Vesicular transporters

Also required early because several important drugs act through vesicular handling.

- VMAT1 - SLC18A1
- VMAT2 - SLC18A2
- VAChT - SLC18A3
- VGLUT1 - SLC17A7
- VGLUT2 - SLC17A6
- VGLUT3 - SLC17A8
- VGAT / VIAAT - SLC32A1
- VNUT - SLC17A9

### 4.4 Synthesis machinery

Include the canonical rate-limiting or pharmacologically important steps first.

Examples:

- TH
- TPH2
- AADC / DDC
- DBH
- PNMT
- ChAT
- GAD1
- GAD2
- histidine decarboxylase

Do not attempt to visualize every metabolic enzyme from the beginning. Include enzymes when they are central to transmitter identity or have meaningful neuropharmacology.

### 4.5 Degradation and inactivation

Examples:

- MAO-A
- MAO-B
- COMT
- AChE
- BChE
- ABAT / GABA transaminase
- FAAH
- MAGL

Endocannabinoid synthesis and degradation can eventually be represented as its own module because signaling is locally synthesized rather than conventionally vesicular.

### 4.6 Release and excitability machinery

These should be a secondary expansion of the first targetome rather than allowed to overwhelm version 0.1.

Examples:

- SV2A
- voltage-gated sodium channels
- voltage-gated calcium channels
- alpha2delta calcium-channel auxiliary subunits
- potassium channels
- HCN channels
- KCNQ channels
- GIRK channels
- presynaptic release machinery where drugs directly target it

These are important for many neurologic and psychiatric drugs but are conceptually somewhat different from transmitter-specific machinery.

### 4.7 Pharmacokinetic targets

Keep these in a **separate overlay** rather than mixing them into the neurotransmission map.

Examples:

- CYP2D6
- CYP3A4
- CYP2C19
- UGT enzymes
- P-glycoprotein / ABCB1

These determine drug exposure rather than the neural effect directly.

This separation gives:

```text
pharmacodynamics = what the drug does to neural biology
pharmacokinetics = what the body and other drugs do to drug exposure
```

---

## 5. The fundamental data objects

Do not store the project as one giant spreadsheet. Use a small set of linked objects or relational tables.

### 5.1 `TransmitterSystem`

```yaml
id:
name:
aliases:
parent_system:
description:
canonical_transmitter:
notes:
```

Examples:

- serotonin
- dopamine
- norepinephrine
- acetylcholine
- glutamate
- GABA
- glycine
- histamine
- adenosine
- purines
- opioids
- endocannabinoids

### 5.2 `Target`

```yaml
id:
canonical_name:
display_name:
gene_symbol:
uniprot_id:
gtopdb_id:
chembl_target_id:
target_class:
target_subclass:
transmitter_system:
causal_stage:
molecular_mechanism:
human_status:
synaptic_location:
notes:
```

Suggested `target_class` vocabulary:

```text
receptor
transporter
vesicular_transporter
synthesis_enzyme
degradation_enzyme
ion_channel
release_machinery
other
```

Suggested `causal_stage` vocabulary:

```text
synthesis
vesicular_loading
release
reception
clearance
degradation
excitability
intracellular_signaling
```

### 5.3 `Drug`

```yaml
id:
canonical_name:
aliases:
chembl_id:
gtopdb_id:
pubchem_cid:
inchi_key:
approval_status:
drug_class:
routes:
notes:
```

Drug classes are labels over individual compounds, not substitutes for them.

For example, "atypical antipsychotic" should be a group containing individual drugs rather than a single pharmacological profile.

### 5.4 `DrugTargetMeasurement`

This stores raw assay-level evidence.

```yaml
id:
drug_id:
target_id:
source:
source_record_id:
publication_id:
assay_type:
measurement_type:
relation:
value:
units:
p_activity:
species:
cell_or_tissue_context:
assay_description:
functional_or_binding:
mechanism_annotation:
quality_flags:
```

This table should remain close to source data.

### 5.5 `DrugTargetInteraction`

This is the curated / aggregated object used by the visualization.

```yaml
drug_id:
target_id:

action_type:
primary_or_secondary:
directness:

affinity_summary:
potency_summary:
efficacy_summary:

evidence_grade:
assay_count:
publication_count:
confidence_interval_or_spread:

mechanism_notes:
source_provenance:
```

Suggested `action_type` vocabulary:

```text
agonist
partial_agonist
superagonist
antagonist
inverse_agonist
positive_allosteric_modulator
negative_allosteric_modulator
channel_blocker
open_channel_blocker
transporter_inhibitor
transporter_substrate
reverse_transport_promoter
vesicular_transport_inhibitor
enzyme_inhibitor
enzyme_inducer
covalent_inhibitor
other
unknown
```

Do not encode pharmacology as a simple signed number where agonist = +1 and antagonist = -1.

### 5.6 `BiologicalRule`

This is primarily a later-phase object for the mechanistic grammar.

```yaml
id:
input_entity:
input_state:
operation:
output_entity:
output_change:
context:
timescale:
evidence:
parameters:
uncertainty:
```

Example:

```text
SERT inhibition
  -> serotonin uptake rate decreases
```

Example:

```text
increased extracellular serotonin
  -> occupancy of locally expressed serotonin receptors increases
```

### 5.7 `Phenotype`

This should cover observable physiological, behavioral, and clinically described outcomes.

```yaml
id:
name:
domain:
ontology_id:
description:
measurement_type:
```

Examples:

- sedation
- wakefulness
- orthostatic hypotension
- analgesia
- appetite change
- nausea
- extrapyramidal symptoms

### 5.8 `PhenomenologicalEffect`

Later-phase subjective-experience ontology.

```yaml
id:
canonical_name:
parent_effect:
domain:
description:
source_ontology:
source_id:
evidence_type:
```

Examples:

- colour enhancement
- tracers
- thought acceleration
- empathy enhancement
- ego dissolution
- time distortion
- stimulation
- sedation

### 5.9 `DrugEffectObservation`

This is deliberately separate from molecular pharmacology.

```yaml
drug_id:
effect_id:
dose_or_exposure:
route:
time_from_administration:
frequency:
intensity:
population:
setting:
coadministered_drugs:
source_type:
source_record_id:
evidence_grade:
```

The schema should support controlled studies and anecdotal reports without pretending they have the same evidential status.

---

## 6. First product: three linked views

### 6.1 Atlas view

This is the direct descendant of the original periodic-table graphic.

Purpose:

> Where does this drug act in the landscape of neurotransmission?

Properties:

- stable target positions,
- transmitter families retain consistent colors,
- transporters and enzymes sit in the same transmitter module as their receptors,
- click any tile for details,
- search by drug or target,
- select multiple drugs,
- direct and indirect effects are visually distinct.

#### Visual channels

Use visual dimensions independently:

- **position** = target identity and transmitter-system membership
- **base color** = transmitter family
- **fill intensity** = affinity, potency, or estimated engagement
- **border / glyph** = mechanism of action
- **halo** = downstream indirect consequence
- **pattern / uncertainty symbol** = low confidence or heterogeneous evidence

The user should be able to switch the numeric meaning of fill intensity.

Possible modes:

- affinity,
- functional potency,
- estimated occupancy,
- clinical relevance,
- evidence confidence.

Never mix these without labeling which mode is active.

### 6.2 Mechanism view

Clicking a tile should open a causal graph.

Example:

```text
fluoxetine
    |
    v
SERT inhibition
    |
    v
serotonin clearance decreases
    |
    v
extracellular serotonin increases
    |
    +--> 5-HT1A occupancy changes
    +--> 5-HT1B occupancy changes
    +--> 5-HT2A occupancy changes
    +--> ...
```

Initially, these can be curated explanatory diagrams.

Later, the same graph becomes executable receptor / signaling grammar.

### 6.3 Compare view

A conventional matrix for exact comparison.

```text
Target        Drug A      Drug B      Drug C
------------------------------------------------
SERT          strong      -           moderate
NET           -           moderate    weak
D2            weak        strong      -
H1            -           strong      -
M1            -           moderate    -
```

Rows should be hierarchical and collapsible:

```text
Serotonin
  Receptors
    5-HT1A
    5-HT2A
  Transport
    SERT
  Metabolism
    MAO-A

Dopamine
  Receptors
    D1
    D2
  Transport
    DAT
  Metabolism
    MAO-B
    COMT
```

This is the best view for polypharmacy and quantitative comparison.

---

## 7. Direct effects versus downstream consequences

This distinction should be first-class from version 0.1.

### Direct target interaction

Examples:

```text
caffeine -> A1 antagonist
amphetamine -> DAT transporter substrate / reverse transport
ketamine -> NMDA channel blocker
fluoxetine -> SERT inhibitor
diazepam -> GABA-A positive allosteric modulator
```

### Indirect consequence

Examples:

```text
DAT reversal
  -> extracellular dopamine rises
  -> increased dopaminergic receptor drive
```

```text
SERT inhibition
  -> serotonin clearance decreases
  -> extracellular serotonin rises
  -> altered activation across local serotonin receptor populations
```

The original amphetamine visualization effectively highlighted downstream dopamine and norepinephrine receptor systems because the transporters themselves were missing. The new atlas should show DAT/NET as the strong direct targets and receptor families as a secondary downstream halo.

This is one of the most important conceptual improvements over the original design.

---

## 8. Quantitative semantics of the heatmap

### 8.1 Version 0.1: affinity / potency mode

For a first implementation, the most defensible quantitative display is a normalized activity measure such as:

\[
pK_i = -\log_{10}(K_i \text{ in molar units})
\]

or equivalently pKd, pEC50, pIC50 when appropriate.

Binding measurements and functional measurements should **not** be silently merged into one number.

At minimum distinguish:

```text
binding affinity:
    Ki
    Kd

functional potency:
    EC50
    IC50

functional efficacy:
    Emax or equivalent
```

### 8.2 Aggregating multiple measurements

Do not simply choose the strongest number ever reported.

Recommended initial procedure:

1. preserve every raw measurement,
2. convert compatible values to molar units and pActivity,
3. separate human from non-human measurements,
4. separate binding from functional assays,
5. retain assay context,
6. remove or flag obvious data-quality problems,
7. calculate a robust summary such as median pActivity,
8. retain dispersion, number of measurements, and number of publications.

A displayed cell should always be expandable back to its evidence.

### 8.3 Version 0.2: exposure-aware engagement

Affinity alone is not equivalent to in-vivo relevance.

Eventually estimate target engagement using exposure.

A simple equilibrium approximation is:

\[
Occupancy = \frac{C_{free}}{C_{free} + K_d}
\]

where \(C_{free}\) is an appropriately defined free concentration at the relevant site.

This is only a first approximation. Real systems may require:

- active metabolites,
- brain penetration,
- unbound fraction,
- transporter kinetics,
- irreversible binding,
- receptor reserve,
- allostery,
- competition with endogenous ligands,
- time-varying concentration,
- tissue-specific exposure.

Whenever human PET or other direct occupancy measurements exist, those should take precedence over a naive concentration-affinity calculation.

---

## 9. Drug combinations

A combination view should distinguish at least four forms of interaction.

### 9.1 Target overlap

```text
Drug A -> D2 <- Drug B
```

Both drugs directly act at the same target.

### 9.2 System or pathway overlap

```text
Drug A -> SERT -> serotonin system <- 5-HT2A <- Drug B
```

Different targets, same signaling system.

### 9.3 Physiological convergence

```text
Drug A -> H1 antagonism -------\
                                -> sedation
Drug B -> GABA-A potentiation -/
```

This requires the later phenotype layer.

### 9.4 Pharmacokinetic interaction

```text
Drug A -> CYP2D6 inhibition -> Drug B clearance decreases -> Drug B exposure rises
```

This should be presented separately from pharmacodynamic overlap.

---

## 10. Phase 1 data sources

The core strategy should be:

> use external databases for factual measurements and nomenclature, while maintaining a small project-specific ontology that defines what counts as part of the neuropharmacology atlas and how it is visually organized.

### 10.1 IUPHAR/BPS Guide to Pharmacology - canonical target backbone

**Role**

Use GtoPdb as the canonical target registry and high-confidence pharmacology seed.

It contains:

- target and family nomenclature,
- receptors,
- ion channels,
- enzymes,
- transporters,
- approved drugs,
- endogenous ligands,
- curated ligand-target interactions,
- quantitative interaction data,
- mappings to HGNC and UniProt.

As of release 2026.2, the site provides downloadable target/family tables and interaction files, including separate transporter and enzyme interaction datasets.

**How to ingest**

1. download the complete target and family list,
2. download the ligand list,
3. download all ligand-target interactions,
4. download the approved-drug interaction file,
5. download HGNC and UniProt mapping files,
6. keep the GtoPdb identifiers as stable external IDs,
7. filter into the atlas through a project-owned `target_scope` table rather than deleting out-of-scope targets.

**Why not copy the site manually**

The database changes over time. The project should be reproducible from a named GtoPdb release.

**Access / licensing note**

GtoPdb provides bulk downloads and a REST service. As of August 2026, it is transitioning the REST API to registered API-key access. Bulk release files are therefore attractive for reproducible builds.

Source:
https://www.guidetopharmacology.org/download.jsp

---

### 10.2 ChEMBL - bulk quantitative pharmacology

**Role**

Use ChEMBL as the primary high-volume source of quantitative drug-target assay data.

Useful fields include:

- compound identity,
- target identity,
- assay,
- Ki,
- Kd,
- IC50,
- EC50,
- activity units,
- assay organism,
- document / publication,
- mechanism-of-action annotations.

ChEMBL 37 is the current 2026 release and contains tens of millions of activity records, so it is much broader than a hand-curated neurotransmission database.

**How to ingest**

1. map project drugs to ChEMBL compound IDs,
2. map project targets to ChEMBL target IDs,
3. pull activities only for drug-target pairs within the targetome,
4. preserve source activity rows rather than immediately aggregating them,
5. standardize units,
6. normalize to pActivity where appropriate,
7. classify assays as binding versus functional,
8. retain organism and assay context,
9. generate an aggregated `DrugTargetInteraction` record only after QC.

**Access**

ChEMBL offers:

- bulk database downloads,
- REST web services,
- Python client support.

Source:
https://www.ebi.ac.uk/chembl/

---

### 10.3 BindingDB - affinity enrichment and cross-checking

**Role**

Use BindingDB to add and cross-check measured ligand-target affinities.

It is particularly useful for:

- Ki,
- Kd,
- IC50,
- literature-derived measurements,
- off-target binding,
- historical pharmacology not cleanly represented in another source.

**How to ingest**

1. start with the BindingDB subset for project drug and target identifiers,
2. use InChIKey / UniProt mappings where possible,
3. preserve Reaction Set ID and assay references,
4. avoid double-counting measurements imported into BindingDB from ChEMBL,
5. tag the original source provenance,
6. use BindingDB-curated measurements as independent evidence where possible.

BindingDB explicitly provides source information and separate assay metadata. It also makes archived releases available, which is useful for reproducible machine-learning datasets.

Source:
https://www.bindingdb.org/

---

### 10.4 ChEBI, PubChem, and UniChem - chemical identity normalization

**Role**

These are identity and cross-reference resources rather than primary pharmacology sources.

Use them to normalize:

- canonical chemical names,
- synonyms,
- structures,
- InChIKeys,
- PubChem CIDs,
- ChEBI IDs,
- mappings between database identifiers.

**How to ingest**

Create a `DrugIdentifier` table:

```text
drug_id
namespace
external_id
is_primary
source
```

Never use names alone as join keys.

---

### 10.5 HGNC and UniProt - target identity normalization

**Role**

Use gene symbols and protein accessions as stable biological cross-references.

**How to ingest**

Store both:

```text
HGNC gene identity
UniProt protein identity
```

because receptor complexes and pharmacological targets do not always map one-to-one onto a single gene product.

---

## 11. Phase 1 enrichment sources

These are useful but do not need to block the first drug-target heatmap.

### 11.1 GPCRdb / GproteinDb

**Use for**

- GPCR family structure,
- G-protein coupling,
- coupling selectivity,
- arrestin coupling,
- receptor structure,
- ligand interactions.

**Later value**

This becomes especially important for the receptor grammar because "5-HT2A agonist" is not the end of the causal description. The receptor can couple into specific transducers, with pathway-biased agonism as a later complication.

Source:
https://gpcrdb.org/

---

### 11.2 Human Protein Atlas Brain

**Use for**

- brain-region expression,
- brain-subregion expression,
- single-cell expression,
- single-nucleus brain data,
- selected protein localization.

**How to add**

Do not bake expression into the target ontology itself.

Create a contextual table:

```text
TargetExpression
    target_id
    anatomical_region
    cell_type
    expression_measure
    dataset
    species
```

The same target can then be filtered by biological context.

Source:
https://www.proteinatlas.org/humanproteome/brain

---

### 11.3 SynGO

**Use for**

- evidence-backed synaptic localization,
- synaptic biological process,
- pre- versus postsynaptic annotation,
- synaptic ontology terms.

**How to add**

Map target genes into SynGO terms and store them as contextual annotations.

This should improve the mechanism view and later help determine whether a target is presynaptic, postsynaptic, vesicular, etc.

Source:
https://syngoportal.org/

---

## 12. Minimal Phase 1 implementation

### 12.1 Deliberately constrained first corpus

Do not begin with every psychoactive molecule ever reported.

Start with approximately:

- 40 to 60 representative neuropsychiatric / neurologic / psychoactive drugs,
- 150 to 300 targets,
- all major classical transmitter systems,
- receptors,
- canonical plasma-membrane transporters,
- vesicular transporters,
- major synthesis and degradation enzymes.

Suggested initial drug categories:

- SSRIs / SNRIs / TCAs,
- stimulants,
- antipsychotics,
- benzodiazepines,
- dissociatives,
- classic psychedelics,
- opioids,
- common sedatives,
- cholinergic drugs,
- dopaminergic drugs,
- anticonvulsants with clear molecular targets,
- caffeine.

The purpose is to stress-test the ontology with mechanistically different drugs.

### 12.2 First required outputs

Version 0.1 should support:

- search and select drug,
- select multiple drugs,
- atlas overlay,
- compare matrix,
- target details,
- direct action type,
- affinity / potency display,
- source provenance,
- direct versus downstream distinction,
- high-level system grouping.

### 12.3 Not required for version 0.1

Explicitly defer:

- personalized clinical predictions,
- full receptor signaling pathways,
- PK simulation,
- receptor occupancy from clinical doses,
- cell-specific network simulation,
- phenomenology prediction,
- machine-learned target-to-experience models,
- generative drug design.

---

## 13. Data pipeline

A reproducible build pipeline is more important than a one-off curated spreadsheet.

### Step 1 - canonical target registry

```text
GtoPdb
   |
   v
TargetRaw
   |
normalize IDs
   |
   v
Target
   |
project curation
   |
   v
TargetScope
```

`TargetScope` should contain:

```text
target_id
include_in_atlas
display_group
transmitter_system
causal_stage
display_order
curation_notes
```

This keeps project-specific visual decisions separate from factual source data.

### Step 2 - canonical drug registry

```text
GtoPdb + ChEMBL + PubChem/ChEBI
             |
             v
            Drug
             |
             v
       DrugIdentifier
```

### Step 3 - raw interaction ingestion

```text
GtoPdb
ChEMBL
BindingDB
   |
   v
DrugTargetMeasurement
```

### Step 4 - normalization

Normalize:

- units,
- activity types,
- target IDs,
- compound IDs,
- species,
- assay category,
- action vocabulary.

### Step 5 - deduplication

Important because databases cross-import from one another.

Deduplicate with:

- publication,
- compound,
- target,
- activity type,
- value,
- assay identifier,
- original source.

Do not treat "same number appearing in three databases" as three independent experiments.

### Step 6 - evidence aggregation

Produce a derived `DrugTargetInteraction` table.

Recommended summary fields:

```text
median_binding_pactivity
binding_mad
n_binding_measurements

median_functional_pactivity
functional_mad
n_functional_measurements

action_type
action_confidence

human_evidence_count
total_publication_count

primary_source
all_sources
```

### Step 7 - generated visualization dataset

Export a frontend-ready artifact such as:

```text
atlas.json
drugs.json
targets.json
interactions.parquet
```

The UI should never need to understand the raw database schemas.

---

## 14. Evidence hierarchy

A quantitative map will look authoritative even when the underlying data are messy. Evidence therefore needs to be visible.

Suggested hierarchy:

### A - strong
- multiple consistent human target measurements,
- clear molecular action,
- curated pharmacological consensus.

### B - moderate
- replicated measurements but heterogeneous assay conditions,
- strong non-human evidence with accepted human target identity.

### C - limited
- small number of measurements,
- indirect functional evidence,
- uncertain action classification.

### D - provisional
- proposed / controversial target,
- weak or conflicting evidence.

The UI should allow users to hide low-confidence interactions.

---

## 15. Later phase: exposure and pharmacokinetics

The first heatmap answers:

> What can this drug interact with, and how strongly in experimental assays?

The next question is:

> Which of those interactions are likely to matter at a real dose?

Add:

```text
DrugExposure
    drug_id
    dose
    route
    formulation
    cmax
    auc
    half_life
    plasma_unbound_fraction
    brain_exposure
    active_metabolites
    source
```

Potential sources:

- FDA prescribing information / DailyMed,
- EMA labels where useful,
- published clinical pharmacokinetic literature,
- curated PK databases where licensing permits,
- PET receptor-occupancy studies.

The engagement layer should explicitly distinguish:

```text
measured occupancy
estimated occupancy
unknown
```

Do not imply precision where only plasma exposure is known.

---

## 16. Later phase: downstream signaling grammar

This is the major bridge from an atlas to a simulation system.

The purpose is to encode reusable mechanistic rules such as:

```text
ligand binds receptor
receptor changes conformational state
receptor activates transducer
transducer changes effector activity
effector changes second messenger
second messenger changes ion channel / enzyme / transcription state
```

### 16.1 Example GPCR grammar

```text
5-HT2A agonism
    -> receptor active-state probability increases
    -> Gq/11 activation increases
    -> PLCbeta activity increases
    -> PIP2 hydrolysis increases
    -> IP3 and DAG increase
    -> intracellular Ca2+ and PKC signaling change
    -> target-dependent changes in excitability / plasticity
```

### 16.2 Example transporter grammar

```text
SERT inhibition
    -> serotonin uptake flux decreases
    -> extracellular serotonin decay constant changes
    -> serotonin concentration trajectory changes
    -> occupancy of locally expressed serotonin receptors changes
```

### 16.3 Example ionotropic grammar

```text
NMDA open-channel blocker
    -> open-state conductance reduced conditional on channel opening
    -> NMDA current changes
    -> Ca2+ entry changes
    -> membrane and signaling dynamics change
```

The grammar should eventually be executable rather than purely descriptive.

---

## 17. Data sources for the signaling grammar

### 17.1 GPCRdb / GproteinDb

Use for:

- GPCR-transducer coupling,
- G-protein subtype preferences,
- arrestin coupling,
- receptor structure,
- ligand bias where sufficiently characterized.

### 17.2 Reactome

Reactome is a curated and peer-reviewed pathway database with machine-accessible content services and downloadable pathway data.

Use it for:

- intracellular signaling pathways,
- biochemical reactions,
- protein complexes,
- pathway membership.

Do not import entire Reactome pathways into every receptor model. Use it as a source from which receptor-relevant causal subgraphs can be extracted.

Source:
https://reactome.org/

### 17.3 SIGNOR

SIGNOR represents **directed, signed causal relationships** and records mechanisms such as binding, phosphorylation, and transcriptional activation.

This is particularly well matched to an executable grammar.

Use it for relationships like:

```text
A activates B
A inhibits B
A phosphorylates B -> activity changes
```

Source:
https://signor.uniroma2.it/

### 17.4 OmniPath

OmniPath integrates many pathway and signaling resources and exposes:

- directed protein interactions,
- regulatory relationships,
- enzyme-PTM relationships,
- protein complexes,
- annotations,
- intercellular signaling.

It is useful as a broad prior network and for cross-resource reconciliation.

Important limitation: OmniPath itself notes that most interactions are not inherently tissue- or cell-type-specific. Context should therefore be supplied using expression / omics data rather than assuming that the full network exists in every neuron.

Source:
https://omnipathdb.org/

### 17.5 Gene Ontology / GO-CAM

Use later for:

- standardized biological process vocabulary,
- molecular function,
- cellular localization,
- causal activity models.

This is especially useful for making the grammar interoperable rather than inventing every biological term locally.

---

## 18. Later phase: cell and circuit context

A molecular target does not have one universal effect.

The same receptor can participate in different dynamics depending on:

- cell type,
- subcellular compartment,
- receptor abundance,
- available G proteins,
- ion-channel repertoire,
- endogenous transmitter concentration,
- transporter expression,
- network state.

Add a `BiologicalContext` object:

```yaml
id:
species:
brain_region:
cell_type:
cell_subtype:
subcellular_compartment:
developmental_stage:
state:
```

Then context-specific availability becomes:

```text
ContextTarget
    context_id
    target_id
    expression
    localization
    confidence
```

Data sources can include:

- Human Protein Atlas,
- Allen Brain Atlas,
- CellxGene / human brain cell atlases,
- individual single-cell / single-nucleus datasets,
- SynGO for synaptic localization,
- specialized literature.

At this stage, a drug can be projected onto a specific cell rather than onto an abstract human targetome.

---

## 19. Later phase: simulation

The target atlas and signaling grammar can become the frontend to several levels of simulation.

### 19.1 Transmitter compartment model

Simulate:

```text
release
diffusion
uptake
degradation
receptor occupancy
```

Useful before any detailed intracellular modeling.

### 19.2 Receptor state models

Represent:

- ligand binding,
- competition,
- agonism,
- partial agonism,
- allostery,
- desensitization,
- internalization,
- biased signaling.

### 19.3 Conductance-based neuron integration

For ionotropic receptors or signaling-modulated channels, map pharmacology into:

- conductances,
- reversal potentials,
- channel-state probabilities,
- second-messenger-dependent modulation.

### 19.4 Network simulation

Once target expression is cell-specific:

```text
drug profile
    -> cell-specific perturbations
    -> network dynamics
    -> circuit-level observable
```

The atlas remains useful as the user-facing entry point even when the backend becomes complex.

---

## 20. Later phase: training models

The same data architecture can support machine learning without making ML the source of truth.

### 20.1 Knowledge graph representation

Nodes:

```text
Drug
Target
Transmitter
Protein
Pathway
CellType
BrainRegion
Phenotype
PhenomenologicalEffect
```

Edges:

```text
BINDS
AGONIZES
ANTAGONIZES
INHIBITS_TRANSPORT
EXPRESSED_IN
ACTIVATES
INHIBITS
CAUSES_OR_ASSOCIATES_WITH
REPORTED_EFFECT
```

Every edge should carry:

```text
source
evidence type
confidence
context
date / version
```

### 20.2 Possible model tasks

- predict missing drug-target interactions,
- predict functional action from chemistry and target,
- predict phenomenological effect profiles from target profiles,
- infer latent mechanistic factors connecting targets to subjective states,
- compare drugs by mechanistic similarity rather than chemical similarity,
- perform inverse design: desired state -> candidate target profile.

### 20.3 Important methodological rule

Predictions should remain distinguishable from curated facts.

Use separate namespaces such as:

```text
observed
curated
derived
predicted
simulated
```

---

## 21. Later phase: phenotype and subjective phenomenology

This is a major eventual extension.

The long-term objective is to connect:

```text
molecule
  -> target engagement
  -> molecular mechanism
  -> signaling
  -> cell / circuit state
  -> measurable behavior / physiology
  -> subjective experience
```

The project should treat phenomenology as a structured target of explanation rather than as free-text anecdotes alone.

---

## 22. Phenomenology ontology sources

### 22.1 Effect Index

Effect Index provides a formalized Subjective Effect Index with a granular taxonomy of sensory, cognitive, and physical subjective effects.

Current examples include:

- colour enhancement,
- visual drifting,
- tracers,
- synaesthesia,
- analysis enhancement,
- emotion intensification,
- thought acceleration,
- ego dissolution / transpersonal effects,
- stimulation,
- sedation.

This is an excellent candidate for a **canonical subjective-effect vocabulary**.

**How to use**

1. import or manually map the effect hierarchy subject to license terms,
2. assign stable internal IDs,
3. preserve Effect Index source IDs / URLs,
4. allow project-specific synonyms but do not alter source definitions silently,
5. create crosswalks to clinical psychometric scales.

**License note**

Effect Index states that its content is CC BY-NC-SA 4.0. That matters if the project becomes commercial.

Source:
https://effectindex.com/effects

---

### 22.2 PsychonautWiki

PsychonautWiki provides:

- substance pages,
- pharmacology descriptions,
- dosage and duration information,
- standardized subjective-effect lists using the Subjective Effect Index,
- semantic data for many entries.

**How to use**

Use it primarily for structured substance-to-effect mappings and cross-reference against Effect Index terminology.

Do not treat community-reported effect lists as equivalent to controlled clinical evidence.

**License note**

PsychonautWiki states that most text and metadata are CC BY-SA 4.0 and that semantic data are CC BY 4.0, while personal reports and some files have separate copyrights.

Source:
https://psychonautwiki.org/

---

### 22.3 Erowid Experience Vaults

Erowid has a uniquely large corpus of first-person psychoactive experience reports and extensive metadata.

Potential future value:

- natural-language phenomenology,
- rare effects,
- combinations,
- dose and route contexts,
- temporal sequences,
- individual variability.

However:

**Do not scrape, mine, aggregate, or feed Erowid Experience Vault reports into an AI system without written permission from Erowid Center.**

Their current usage agreement explicitly requires prior permission for mining, aggregate analysis, and AI ingestion.

If permission is obtained later:

1. retain report IDs and metadata,
2. never treat report frequency as population incidence,
3. model reporting bias and selection bias,
4. extract effects using the controlled phenomenology ontology,
5. preserve uncertainty,
6. separate individual narrative observations from aggregate scientific claims.

Source:
https://www.erowid.org/experiences/

---

### 22.4 Validated psychometric instruments

Community ontologies should be linked to controlled experimental measures.

Possible later crosswalks include instruments such as:

- 5D-ASC,
- MEQ30,
- Ego Dissolution Inventory,
- Challenging Experience Questionnaire,
- Hallucinogen Rating Scale,
- validated mood and cognitive scales where appropriate.

The goal is not to force all phenomenology into one scale. It is to create mappings between:

```text
fine-grained effect ontology
clinical / experimental questionnaire dimensions
free-text reports
```

---

## 23. Relation to Mindstate Design Labs

Mindstate Design Labs is an important neighboring concept, not simply a data source.

The company describes its Osmanthus platform as combining tens of thousands of human psychoactive-effect reports with biochemical data to infer how combinations of neurotransmitter-receptor interactions relate to emotional, perceptual, and cognitive states.

That is close to one long-term goal of this project:

```text
pharmacology -> subjective state
```

The differentiating direction here should be **mechanistic transparency and multiscale causality**.

Rather than only:

```text
receptor target profile
    -> predicted mental state
```

the aspirational representation is:

```text
drug
    -> target affinity / efficacy / occupancy
    -> transporter / receptor / enzyme perturbation
    -> transmitter dynamics
    -> receptor state
    -> transducer / intracellular signaling
    -> cell-specific electrophysiology
    -> circuit dynamics
    -> physiological / behavioral state
    -> phenomenological effect profile
```

Not every arrow will be fully known or simulatable.

The point is to maintain the causal slots so that empirical, modeled, inferred, and unknown links remain distinguishable.

This provides a path toward a system that has some of the target-to-state ambition of Mindstate Design Labs but exposes a much richer mechanistic substrate.

Source:
https://www.mindstate.design/

---

## 24. Phenomenology data model

A future effect graph should distinguish at least:

### 24.1 Effect identity

```text
colour enhancement
thought acceleration
anxiety
ego dissolution
analgesia
sedation
```

### 24.2 Effect dimensions

```text
presence / absence
probability
intensity
latency
duration
valence
confidence
```

### 24.3 Context

```text
dose
route
time
setting
expectation
coadministered substances
tolerance
population
study design
```

### 24.4 Evidence type

```text
controlled_trial
observational_study
validated_questionnaire
case_report
curated_community_summary
experience_report
model_prediction
```

This is crucial because subjective effects are unusually context-dependent.

---

## 25. Mechanistic links to phenomenology

Avoid prematurely encoding statements like:

```text
5-HT2A activation = visual geometry
```

as deterministic rules.

Instead represent hypotheses:

```text
target profile
    -> intermediate biological state
    -> phenomenological effect
```

with evidence weights.

For example:

```yaml
source_pattern:
  5HT2A_activation: high

effect:
  visual_patterning

evidence:
  pharmacological_blockade: ...
  human_trials: ...
  cross_drug_association: ...
  model_prediction: ...

confidence:
  ...
```

This lets the project test whether a receptor profile is sufficient to explain an effect or whether context, downstream signaling, network state, or other targets are needed.

---

## 26. A possible "state design" mode

A much later interface could invert the atlas.

Instead of:

> What does this drug do?

ask:

> What target profile is associated with this desired state?

For example:

```text
Desired phenomenology
  increased aesthetic salience
  increased emotional openness
  low anxiety
  low visual hallucination
        |
        v
Predicted mechanistic target profile
        |
        v
Candidate known drugs / combinations / hypothetical compounds
```

This should be treated as a research and model-design tool, not as a direct prescribing or self-medication engine.

The mechanistic grammar provides an important advantage here because target combinations can be evaluated not only statistically but also for predicted interactions inside the same signaling and circuit machinery.

---

## 27. UI roadmap

### Phase A - static atlas prototype

- render transmitter modules,
- stable tile positions,
- no drug data required initially,
- verify that the map remains readable with transporters and enzymes added.

### Phase B - drug overlay

- 40-60 drugs,
- direct target highlights,
- mechanism glyphs,
- affinity / potency intensity,
- source tooltip.

### Phase C - compare mode

- 2-5 simultaneous drugs,
- direct overlap,
- system overlap,
- matrix view,
- union / intersection filters.

### Phase D - target detail

Click target:

```text
canonical name
gene
target class
endogenous ligand
major signaling
drug interactions
measurement distribution
sources
```

### Phase E - mechanism graph

Add direct causal rules for a subset of well-characterized systems.

Start with:

- monoamine reuptake,
- dopamine GPCRs,
- serotonin GPCRs,
- GABA-A,
- NMDA,
- opioid receptors.

### Phase F - exposure-aware mode

Add dose and occupancy / engagement where defensible.

### Phase G - context

Select:

```text
brain region
cell type
```

and mask / weight targets by expression.

### Phase H - phenotype and phenomenology

Add:

- physiological outcome ontology,
- Effect Index mapping,
- PsychonautWiki mapping,
- controlled experimental data,
- later, permissioned experience-report corpora.

### Phase I - simulation and learned models

Use the same graph as:

- simulation configuration,
- training dataset,
- mechanistic prior,
- explanation layer for model predictions.

---

## 28. Recommended repository structure

```text
neuropharm-atlas/
|
|-- data/
|   |-- raw/
|   |   |-- gtopdb/
|   |   |-- chembl/
|   |   |-- bindingdb/
|   |   |-- gpcrdb/
|   |   `-- ...
|   |
|   |-- normalized/
|   |   |-- drugs.parquet
|   |   |-- targets.parquet
|   |   |-- measurements.parquet
|   |   |-- interactions.parquet
|   |   `-- identifiers.parquet
|   |
|   `-- curated/
|       |-- target_scope.yaml
|       |-- atlas_layout.yaml
|       |-- action_types.yaml
|       |-- transmitter_systems.yaml
|       `-- biological_rules/
|
|-- pipelines/
|   |-- ingest_gtopdb.py
|   |-- ingest_chembl.py
|   |-- ingest_bindingdb.py
|   |-- normalize_ids.py
|   |-- normalize_activities.py
|   `-- build_release.py
|
|-- schema/
|   |-- drug.py
|   |-- target.py
|   |-- interaction.py
|   |-- evidence.py
|   `-- biological_rule.py
|
|-- app/
|   |-- atlas/
|   |-- compare/
|   |-- mechanism/
|   `-- target_detail/
|
|-- tests/
|
|-- releases/
|   `-- 0.1/
|
`-- docs/
```

The key separation is:

```text
raw source data
!= normalized data
!= curated project ontology
!= generated UI dataset
```

---

## 29. Versioning and provenance

Every generated release should record:

```yaml
atlas_version:
build_date:

sources:
  gtopdb_release:
  chembl_release:
  bindingdb_release:
  gpcrdb_release:
  syngo_release:
  hpa_release:

curation_commit:
schema_version:
```

Every displayed drug-target relationship should be traceable back to source measurements.

This is especially important if the system later becomes a training corpus.

---

## 30. Quality-control tests

Automated tests should verify:

### Identity
- no duplicate canonical target IDs,
- every external identifier namespace is valid,
- gene-symbol mappings are versioned.

### Measurements
- no impossible units,
- pActivity conversion is correct,
- censored measurements such as `>10 uM` remain censored,
- binding and functional assays are not mixed.

### Actions
- antagonist is not represented as negative efficacy unless specifically an inverse agonist,
- PAM / NAM remains distinct from orthosteric agonism / antagonism,
- transporter substrate remains distinct from uptake inhibitor.

### Visualization
- each included target has one stable atlas location,
- every tile maps to exactly one target or explicitly defined receptor complex,
- indirect effects cannot be visually mistaken for direct binding.

### Provenance
- every aggregated interaction has at least one source record,
- every manual annotation includes a curator note and date.

---

## 31. Open scientific problems to preserve rather than hide

The system should make unresolved issues visible.

Examples:

- assay-dependent affinity,
- species differences,
- receptor heteromers,
- functional selectivity / biased agonism,
- receptor reserve,
- active metabolites,
- uncertain brain exposure,
- context-dependent signaling,
- transmitter spillover,
- constitutive activity,
- target expression differences,
- uncertain causal links from molecular action to clinical effect,
- strong context dependence of subjective phenomenology.

A useful atlas does not need to eliminate these uncertainties. It needs to represent them explicitly.

---

## 32. Short implementation sequence

### Milestone 1 - ontology
Build the target registry and transmitter-system modules.

**Deliverable:** static atlas with receptors + transporters + major enzymes.

### Milestone 2 - pharmacology
Ingest GtoPdb, ChEMBL, and BindingDB for a small drug set.

**Deliverable:** selectable drug overlay with evidence-backed cells.

### Milestone 3 - comparison
Add multi-drug selection and matrix view.

**Deliverable:** direct target overlap and pathway overlap.

### Milestone 4 - mechanism
Curate a small executable rule grammar.

**Deliverable:** click-through causal graph for selected systems.

### Milestone 5 - exposure
Add PK and occupancy where adequate data exist.

**Deliverable:** switch from "affinity map" to "estimated engagement map."

### Milestone 6 - biological context
Add region / cell-type expression.

**Deliverable:** context-conditioned target map.

### Milestone 7 - phenotype
Link molecular mechanisms to evidence-backed physiological and clinical outcomes.

### Milestone 8 - phenomenology
Integrate standardized subjective-effect taxonomies and controlled human data.

### Milestone 9 - learned models
Train models over the graph while preserving source / prediction distinctions.

### Milestone 10 - multiscale simulation
Use target perturbations as inputs to receptor, cellular, and circuit models.

---

## 33. The conceptual endpoint

The project should ultimately allow several equivalent traversals through the same knowledge structure.

### Forward pharmacology

```text
select drug
 -> see direct targets
 -> inspect mechanism
 -> propagate through signaling
 -> inspect cell / circuit consequences
 -> inspect phenotypes / phenomenology
```

### Comparative pharmacology

```text
select drugs
 -> compare target profiles
 -> identify overlap
 -> identify pathway convergence
 -> identify divergent effects
```

### Mechanistic explanation

```text
select effect
 -> inspect associated pathways
 -> inspect implicated cell / circuit states
 -> inspect targets
 -> inspect drugs producing those target profiles
```

### Simulation

```text
set drug + dose + context
 -> estimate target engagement
 -> perturb mechanistic grammar
 -> run cellular / network model
 -> compare simulated outcomes with empirical observations
```

### Model training

```text
molecular structure
 + target pharmacology
 + context
 + mechanistic graph
 + phenotype / phenomenology
 -> train prediction or representation model
```

### State design

```text
desired phenomenology
 -> inferred mechanistic profile
 -> candidate target profile
 -> candidate intervention
```

The first release should implement only the small left edge of this vision:

```text
drug -> direct neural targets -> clean visualization
```

Everything downstream should be designed for in the schema but not allowed to delay that first working atlas.

---

## 34. Immediate next actions

1. Freeze the target ontology schema.
2. Convert the existing receptor spreadsheet into the new `Target` table.
3. Add canonical transporters, vesicular transporters, synthesis enzymes, and degradation enzymes.
4. Create `target_scope.yaml` and `atlas_layout.yaml`.
5. Choose an initial 40-60 drug benchmark set.
6. Ingest GtoPdb 2026.2 as the high-confidence target and interaction backbone.
7. Map those drugs and targets into ChEMBL 37.
8. Add BindingDB measurements with source deduplication.
9. Build the first normalized `DrugTargetMeasurement` table.
10. Create the first derived `DrugTargetInteraction` table.
11. Implement the atlas view.
12. Implement the compare matrix.
13. Only after the interaction semantics feel correct, begin the first signaling-grammar prototype.

---

## 35. Data-source summary

| Need | Primary source | Secondary source | Integration strategy |
|---|---|---|---|
| Target nomenclature | GtoPdb | HGNC / UniProt | canonical target registry |
| Drug identity | ChEMBL / GtoPdb | PubChem / ChEBI / UniChem | identifier crosswalk |
| Curated mechanisms | GtoPdb | ChEMBL MOA | normalized action vocabulary |
| Quantitative affinity / potency | ChEMBL | BindingDB, GtoPdb | raw assay table + robust aggregation |
| GPCR transducer coupling | GPCRdb / GproteinDb | GtoPdb | later signaling grammar |
| Brain expression | Human Protein Atlas | Allen / CellxGene | context table |
| Synaptic localization | SynGO | GO | context / ontology annotation |
| Intracellular pathways | Reactome | OmniPath | extract receptor-relevant subgraphs |
| Signed causal signaling | SIGNOR | OmniPath | BiologicalRule candidates |
| Phenomenology vocabulary | Effect Index | PsychonautWiki | controlled effect ontology |
| Substance-effect summaries | PsychonautWiki | scientific literature | evidence-tagged mappings |
| First-person reports | Erowid, only with permission | other permissioned corpora | later NLP / structured extraction |
| Validated subjective measures | peer-reviewed instruments / trials | clinical datasets | effect-ontology crosswalk |
| Exposure / PK | FDA labels / DailyMed / literature | curated PK resources | later DrugExposure table |

---

## 36. Source and licensing notes

Licensing should be tracked at the **record source level**, not only at the project level.

Important examples as of August 2026:

- **GtoPdb:** bulk downloads are available under stated open-data / content licenses. Check the current release terms before redistribution.
- **ChEMBL:** open resource with Creative Commons licensing; preserve attribution and release version.
- **BindingDB:** public scientific database; use archived releases for reproducible datasets and preserve original provenance.
- **Effect Index:** CC BY-NC-SA 4.0, which restricts commercial reuse.
- **PsychonautWiki:** most text/metadata CC BY-SA 4.0; semantic data described as CC BY 4.0; individual reports/files may differ.
- **Erowid Experience Vaults:** explicit prior written permission is required before mining, aggregate analysis, or AI ingestion of the report corpus.
- **OmniPath:** integrated records inherit licenses from original sources; commercial filtering needs to respect upstream licenses.

Before any public or commercial release, add an automated license manifest to the build.

---

## 37. Reference links

### Core pharmacology
- IUPHAR/BPS Guide to Pharmacology: https://www.guidetopharmacology.org/
- GtoPdb downloads: https://www.guidetopharmacology.org/download.jsp
- ChEMBL: https://www.ebi.ac.uk/chembl/
- BindingDB: https://www.bindingdb.org/
- ChEBI: https://www.ebi.ac.uk/chebi/
- PubChem: https://pubchem.ncbi.nlm.nih.gov/
- UniProt: https://www.uniprot.org/
- HGNC: https://www.genenames.org/

### Signaling and biological context
- GPCRdb / GproteinDb: https://gpcrdb.org/
- Reactome: https://reactome.org/
- SIGNOR: https://signor.uniroma2.it/
- OmniPath: https://omnipathdb.org/
- Gene Ontology: https://geneontology.org/
- Human Protein Atlas Brain: https://www.proteinatlas.org/humanproteome/brain
- SynGO: https://syngoportal.org/

### Phenomenology
- Effect Index: https://effectindex.com/effects
- PsychonautWiki: https://psychonautwiki.org/
- Erowid Experience Vaults: https://www.erowid.org/experiences/
- Mindstate Design Labs: https://www.mindstate.design/

---

## 38. One-sentence project definition

> **A spatially learnable, evidence-traceable atlas connecting psychoactive drugs to the molecular machinery of neurotransmission, designed first for clear drug-target comparison and later as the front end to mechanistic signaling models, neural simulation, learned pharmacology models, and structured mappings from molecular action to human phenomenology.**
