/**
 * CBSE Class XII Chemistry (043) - Official Named Reactions & Mechanistic Roadmaps
 * 2026-2027 Examination Blueprint Standard
 * Covers every named reaction tested in CBSE Class XII Chemistry board examinations.
 * Includes reactants, catalysts, conditions, balanced equations, mechanisms, and distinction tests.
 */
export const cbseNamedReactions = [
    // Haloalkanes and Haloarenes (chemistry-6-1)
    {
        id: 'che-rxn-01',
        name: 'Sandmeyer Reaction',
        chapterId: 'chemistry-6-1',
        reactants: ['Benzene diazonium chloride (C6H5N2+ Cl-)'],
        reagents: 'Cu2Cl2 / HCl or Cu2Br2 / HBr or CuCN / KCN',
        conditions: 'Room temperature (298 K)',
        products: ['Chlorobenzene / Bromobenzene / Benzonitrile + N2 gas'],
        balancedEquation: 'C6H5N2+ Cl- + Cu2Cl2 / HCl -> C6H5Cl + N2 + Cu2Cl2',
        mechanismType: 'Nucleophilic Substitution',
        syntheticUtility: 'High-yield direct route to synthesize chloro, bromo, and cyano arenes from primary aromatic amines via diazonium salts.',
        distinctionRole: 'Accompanied by vigorous evolution of nitrogen gas bubbles.',
        commonBoardTraps: [
            'Confusing Sandmeyer (uses cuprous halides Cu2X2) with Gattermann (uses copper powder Cu + HX). Sandmeyer gives strictly higher yield.',
            'Attempting to prepare iodobenzene with Cu2I2; iodobenzene requires only warming with aqueous KI (no copper catalyst needed).'
        ]
    },
    {
        id: 'che-rxn-02',
        name: 'Gattermann Reaction',
        chapterId: 'chemistry-6-1',
        reactants: ['Benzene diazonium chloride (C6H5N2+ Cl-)'],
        reagents: 'Copper powder (Cu) + HCl or HBr',
        conditions: 'Warm gently',
        products: ['Chlorobenzene or Bromobenzene + N2 + CuCl'],
        balancedEquation: 'C6H5N2+ Cl- + Cu / HCl -> C6H5Cl + N2 + CuCl',
        mechanismType: 'Nucleophilic Substitution',
        syntheticUtility: 'Alternative method to prepare haloarenes from diazonium salts using metallic copper powder rather than cuprous salts.',
        commonBoardTraps: [
            'Gattermann reaction produces lower yield than Sandmeyer reaction due to side-reaction biphenyl formation.'
        ]
    },
    {
        id: 'che-rxn-03',
        name: 'Balz-Schiemann Reaction',
        chapterId: 'chemistry-6-1',
        reactants: ['Aniline or Benzene diazonium chloride'],
        reagents: 'Fluoroboric acid (HBF4)',
        conditions: 'Precipitate diazonium fluoroborate at 273 K, then isolate and heat dry salt',
        products: ['Fluorobenzene (C6H5F) + BF3 + N2'],
        balancedEquation: 'C6H5N2+ Cl- + HBF4 -> C6H5N2+ BF4- (solid ppt) --heat--> C6H5F + BF3 + N2',
        mechanismType: 'Nucleophilic Substitution',
        syntheticUtility: 'The exclusive laboratory method for preparing fluorobenzene, because direct fluorination of benzene is violently explosive.',
        commonBoardTraps: [
            'Direct fluorination with F2 cannot be used due to uncontrolled exothermic C-C cleavage.'
        ]
    },
    {
        id: 'che-rxn-04',
        name: 'Finkelstein Reaction',
        chapterId: 'chemistry-6-1',
        reactants: ['Alkyl chloride (R-Cl) or Alkyl bromide (R-Br)'],
        reagents: 'Sodium iodide (NaI) in dry acetone',
        conditions: 'Reflux in dry acetone',
        products: ['Alkyl iodide (R-I) + NaCl or NaBr precipitate'],
        balancedEquation: 'R-X + NaI --dry acetone--> R-I + NaX (ppt, where X = Cl, Br)',
        mechanismType: 'Nucleophilic Substitution',
        syntheticUtility: 'Halogen exchange reaction specifically for synthesizing alkyl iodides. Driven to completion by Le Chatelier’s principle because NaCl/NaBr are insoluble in dry acetone and precipitate out.',
        commonBoardTraps: [
            'Forgetting why dry acetone is necessary: NaI is soluble in acetone, but NaCl and NaBr precipitate, shifting equilibrium forward.'
        ]
    },
    {
        id: 'che-rxn-05',
        name: 'Swarts Reaction',
        chapterId: 'chemistry-6-1',
        reactants: ['Alkyl chloride (R-Cl) or Alkyl bromide (R-Br)'],
        reagents: 'Metallic fluorides: AgF, Hg2F2, CoF3, or SbF3',
        conditions: 'Heat gently',
        products: ['Alkyl fluoride (R-F) + metallic halide ppt'],
        balancedEquation: 'R-Br + AgF -> R-F + AgBr (ppt)',
        mechanismType: 'Nucleophilic Substitution',
        syntheticUtility: 'The standard synthetic method for preparing alkyl fluorides by heating alkyl chlorides or bromides with heavy metal fluorides.',
        commonBoardTraps: [
            'Using NaF or KF instead of heavy metal fluorides like AgF or Hg2F2.'
        ]
    },
    {
        id: 'che-rxn-06',
        name: 'Wurtz-Fittig Reaction',
        chapterId: 'chemistry-6-1',
        reactants: ['Aryl halide (Ar-X) + Alkyl halide (R-X)'],
        reagents: 'Metallic sodium (2 Na) in dry ether',
        conditions: 'Reflux in moisture-free dry ether',
        products: ['Alkylarene (Ar-R) + 2 NaX'],
        balancedEquation: 'C6H5-Br + 2 Na + Br-CH3 --dry ether--> C6H5-CH3 (Toluene) + 2 NaBr',
        mechanismType: 'Nucleophilic Substitution',
        syntheticUtility: 'Coupling an aryl halide with an alkyl halide to synthesize substituted alkylbenzenes like toluene or ethylbenzene.',
        commonBoardTraps: [
            'Using wet ether: sodium reacts violently with water producing H2 gas and NaOH, destroying reactants.'
        ]
    },
    {
        id: 'che-rxn-07',
        name: 'Fittig Reaction',
        chapterId: 'chemistry-6-1',
        reactants: ['Two molecules of Aryl halide (2 Ar-X)'],
        reagents: 'Metallic sodium (2 Na) in dry ether',
        conditions: 'Reflux in dry ether',
        products: ['Diphenyl / Biphenyl (Ar-Ar) + 2 NaX'],
        balancedEquation: '2 C6H5-Cl + 2 Na --dry ether--> C6H5-C6H5 (Diphenyl) + 2 NaCl',
        mechanismType: 'Nucleophilic Substitution',
        syntheticUtility: 'Coupling two aryl radicals to synthesize symmetrical diaryl compounds.',
        commonBoardTraps: [
            'Confusing Wurtz (alkyl + alkyl), Wurtz-Fittig (aryl + alkyl), and Fittig (aryl + aryl).'
        ]
    },
    // Alcohols, Phenols and Ethers (chemistry-7-1)
    {
        id: 'che-rxn-08',
        name: 'Kolbe’s Reaction',
        chapterId: 'chemistry-7-1',
        reactants: ['Phenol (C6H5OH)'],
        reagents: '1. Aqueous NaOH; 2. Carbon dioxide (CO2); 3. H+ (acidification)',
        conditions: 'Temperature 400 K, pressure 4–7 atm, followed by dilute HCl',
        products: ['2-Hydroxybenzoic acid (Salicylic acid)'],
        balancedEquation: 'C6H5OH + NaOH -> C6H5ONa --(1) CO2, 400K, 4-7 atm / (2) H+--> 2-HO-C6H4-COOH',
        mechanismType: 'Electrophilic Substitution',
        syntheticUtility: 'Industrial route to synthesize salicylic acid, the starting precursor for Aspirin (acetylsalicylic acid) and Methyl salicylate (oil of wintergreen).',
        commonBoardTraps: [
            'Using phenol directly with CO2 without NaOH: phenoxide ion (C6H5O-) is far more nucleophilic and electron-rich than neutral phenol, which is necessary to attack weak electrophile CO2.'
        ]
    },
    {
        id: 'che-rxn-09',
        name: 'Reimer-Tiemann Reaction',
        chapterId: 'chemistry-7-1',
        reactants: ['Phenol (C6H5OH) + Chloroform (CHCl3)'],
        reagents: 'Aqueous sodium hydroxide (NaOH) followed by acid hydrolysis',
        conditions: '340 K (reflux)',
        products: ['Salicylaldehyde (2-Hydroxybenzaldehyde) as major product'],
        balancedEquation: 'C6H5OH + CHCl3 + 3 NaOH -> 2-HO-C6H4-CHO + 3 NaCl + 2 H2O',
        mechanismType: 'Electrophilic Substitution',
        mechanismSteps: [
            'Generation of electrophile: OH- abstracts proton from CHCl3 forming trichloromethyl carbanion (:CCl3-), which loses Cl- to form neutral electrophilic Dichlorocarbene (:CCl2).',
            'Electrophilic attack of :CCl2 on electron-rich ortho position of phenoxide ion.',
            'Nucleophilic displacement of both chlorines by aqueous OH- to form unstable gem-diol.',
            'Loss of water molecule yielding -CHO group (salicylaldehyde).'
        ],
        syntheticUtility: 'Formylation of phenols to synthesize ortho-hydroxy aromatic aldehydes.',
        commonBoardTraps: [
            'Identifying the intermediate electrophile incorrectly: the active electrophile is neutral Dichlorocarbene (:CCl2), NOT a carbocation!',
            'Using CCl4 instead of CHCl3: CCl4 yields salicylic acid, whereas CHCl3 yields salicylaldehyde.'
        ]
    },
    {
        id: 'che-rxn-10',
        name: 'Williamson Ether Synthesis',
        chapterId: 'chemistry-7-1',
        reactants: ['Sodium alkoxide (R-O- Na+) + Primary alkyl halide (R\'-X)'],
        reagents: 'Dry alcohol or ether solvent',
        conditions: 'Mild warming',
        products: ['Ether (R-O-R\') + Sodium halide (NaX)'],
        balancedEquation: 'R-O- Na+ + R\'-X --SN2--> R-O-R\' + NaX',
        mechanismType: 'Nucleophilic Substitution',
        syntheticUtility: 'Versatile laboratory method for preparing symmetrical and unsymmetrical ethers.',
        commonBoardTraps: [
            'Using a tertiary alkyl halide (e.g. tert-butyl bromide) with sodium methoxide: tertiary halides undergo E2 elimination to yield alkene (isobutylene) instead of ether!',
            'To prepare tert-butyl methyl ether, one MUST use sodium tert-butoxide + methyl bromide (primary halide).'
        ]
    },
    // Aldehydes, Ketones and Carboxylic Acids (chemistry-8-1)
    {
        id: 'che-rxn-11',
        name: 'Rosenmund Reduction',
        chapterId: 'chemistry-8-1',
        reactants: ['Acyl chloride / Acid chloride (R-COCl or Ar-COCl)'],
        reagents: 'Hydrogen gas (H2) over Palladium catalyst supported on Barium sulphate (Pd / BaSO4)',
        conditions: 'Boiling xylene, poisoned with sulphur or quinoline',
        products: ['Aldehyde (R-CHO) + HCl gas'],
        balancedEquation: 'R-COCl + H2 --Pd / BaSO4, poisoned with S--> R-CHO + HCl',
        mechanismType: 'Oxidation-Reduction',
        syntheticUtility: 'Selective catalytic hydrogenation of acid chlorides to aldehydes without over-reduction to primary alcohols.',
        commonBoardTraps: [
            'Forgetting role of BaSO4/S: acts as a catalyst poison to deactivate Pd and prevent further reduction of aldehyde to alcohol.',
            'Cannot be used to prepare formaldehyde (HCHO) because formyl chloride (HCOCl) is unstable at room temperature.'
        ]
    },
    {
        id: 'che-rxn-12',
        name: 'Stephen Reaction',
        chapterId: 'chemistry-8-1',
        reactants: ['Nitrile / Alkyl cyanide (R-CN or Ar-CN)'],
        reagents: 'Stannous chloride (SnCl2) + concentrated HCl, followed by boiling with water',
        conditions: 'Dry ether at room temperature, then steam hydrolysis',
        products: ['Aldehyde (R-CHO) + NH4Cl'],
        balancedEquation: 'R-CN + SnCl2 + 2 HCl -> R-CH=NH·HCl (aldimine hydrochloride) --H3O+--> R-CHO + NH4Cl',
        mechanismType: 'Oxidation-Reduction',
        syntheticUtility: 'Reduction of nitriles to imine intermediates followed by acidic hydrolysis to give aldehydes.',
        commonBoardTraps: [
            'Forgetting that DIBAL-H (diisobutylaluminium hydride) at 195 K is an alternative modern reagent for nitrile reduction.'
        ]
    },
    {
        id: 'che-rxn-13',
        name: 'Etard Reaction',
        chapterId: 'chemistry-8-1',
        reactants: ['Toluene (C6H5-CH3)'],
        reagents: 'Chromyl chloride (CrO2Cl2) in CS2 or CCl4 solvent, followed by aqueous acid',
        conditions: 'Room temperature, followed by acidic hydrolysis',
        products: ['Benzaldehyde (C6H5-CHO)'],
        balancedEquation: 'C6H5-CH3 + 2 CrO2Cl2 --CS2--> C6H5-CH(OCrOHCl2)2 (brown chromium complex) --H3O+--> C6H5-CHO',
        mechanismType: 'Oxidation-Reduction',
        syntheticUtility: 'Controlled mild oxidation of aromatic methyl groups to benzaldehyde without over-oxidation to benzoic acid.',
        commonBoardTraps: [
            'Using KMnO4 instead: strong oxidants like alkaline KMnO4 or acidic K2Cr2O7 oxidize toluene all the way to benzoic acid, not benzaldehyde!'
        ]
    },
    {
        id: 'che-rxn-14',
        name: 'Gattermann-Koch Reaction',
        chapterId: 'chemistry-8-1',
        reactants: ['Benzene or substituted arene'],
        reagents: 'Carbon monoxide (CO) + Hydrogen chloride (HCl)',
        conditions: 'In presence of anhydrous AlCl3 and CuCl catalyst under pressure',
        products: ['Benzaldehyde (C6H5-CHO) + HCl'],
        balancedEquation: 'C6H6 + CO + HCl --anhyd. AlCl3 / CuCl--> C6H5-CHO + HCl',
        mechanismType: 'Electrophilic Substitution',
        syntheticUtility: 'Direct formylation of benzene ring using CO and HCl gases generated in situ (acting as formyl chloride equivalent).',
        commonBoardTraps: [
            'Confusing Gattermann reaction (diazonium to haloarene) with Gattermann-Koch reaction (benzene to benzaldehyde).'
        ]
    },
    {
        id: 'che-rxn-15',
        name: 'Clemmensen Reduction',
        chapterId: 'chemistry-8-1',
        reactants: ['Aldehyde or Ketone (>C=O)'],
        reagents: 'Zinc amalgam (Zn-Hg) + Concentrated hydrochloric acid (HCl)',
        conditions: 'Reflux with conc. HCl',
        products: ['Alkane (>CH2) + H2O'],
        balancedEquation: 'R-CO-R\' + 4 [H] --Zn-Hg / conc. HCl--> R-CH2-R\' + H2O',
        mechanismType: 'Oxidation-Reduction',
        syntheticUtility: 'Direct conversion of carbonyl (>C=O) group to methylene (>CH2) group under acidic conditions.',
        commonBoardTraps: [
            'Cannot be used for substrates containing acid-sensitive groups (e.g. -OH, -C=C-, acetals); use Wolff-Kishner reduction for acid-sensitive compounds instead.'
        ]
    },
    {
        id: 'che-rxn-16',
        name: 'Wolff-Kishner Reduction',
        chapterId: 'chemistry-8-1',
        reactants: ['Aldehyde or Ketone (>C=O)'],
        reagents: 'Hydrazine (NH2NH2) followed by potassium hydroxide (KOH) in ethylene glycol',
        conditions: 'Heating at 453–473 K',
        products: ['Alkane (>CH2) + N2 gas + H2O'],
        balancedEquation: 'R-CO-R\' + NH2NH2 -> R-C(=NNH2)-R\' (hydrazone) --KOH / ethylene glycol, heat--> R-CH2-R\' + N2',
        mechanismType: 'Oxidation-Reduction',
        syntheticUtility: 'Direct conversion of carbonyl (>C=O) group to methylene (>CH2) group under strongly basic conditions.',
        commonBoardTraps: [
            'Cannot be used for base-sensitive substrates (e.g. halo-substituted carbonyls); use Clemmensen for base-sensitive substrates.'
        ]
    },
    {
        id: 'che-rxn-17',
        name: 'Tollens’ Test (Silver Mirror Test)',
        chapterId: 'chemistry-8-1',
        reactants: ['Aldehyde (Aliphatic or Aromatic: R-CHO or Ar-CHO)'],
        reagents: 'Tollens’ reagent: Ammoniacal silver nitrate [Ag(NH3)2]+ OH-',
        conditions: 'Warm gently in clean water bath',
        products: ['Carboxylate anion (R-COO-) + Metallic silver mirror (Ag) + NH3 + H2O'],
        balancedEquation: 'R-CHO + 2 [Ag(NH3)2]+ + 3 OH- -> R-COO- + 2 Ag (silver mirror) + 4 NH3 + 2 H2O',
        mechanismType: 'Oxidation-Reduction',
        syntheticUtility: 'Primary analytical test to distinguish aldehydes from ketones (ketones give negative test, no silver mirror).',
        distinctionRole: 'Both aliphatic and aromatic aldehydes give positive silver mirror; ketones do not react.',
        commonBoardTraps: [
            'Thinking benzaldehyde fails Tollens: Benzaldehyde DOES reduce Tollens reagent (it only fails Fehling’s test!).'
        ]
    },
    {
        id: 'che-rxn-18',
        name: 'Fehling’s Test',
        chapterId: 'chemistry-8-1',
        reactants: ['Aliphatic aldehyde (R-CHO)'],
        reagents: 'Fehling’s A (aqueous CuSO4) + Fehling’s B (alkaline sodium potassium tartrate / Rochelle salt)',
        conditions: 'Boil in water bath',
        products: ['Carboxylate anion (R-COO-) + Red-brown precipitate of Cuprous oxide (Cu2O)'],
        balancedEquation: 'R-CHO + 2 Cu2+ + 5 OH- -> R-COO- + Cu2O (red ppt) + 3 H2O',
        mechanismType: 'Oxidation-Reduction',
        syntheticUtility: 'Distinguishes aliphatic aldehydes from aromatic aldehydes and ketones.',
        distinctionRole: 'Aliphatic aldehydes give red Cu2O precipitate. Aromatic aldehydes (benzaldehyde) and ketones give NEGATIVE test.',
        commonBoardTraps: [
            'Claiming benzaldehyde gives positive Fehling test: Aromatic aldehydes DO NOT reduce Fehling solution due to resonance stabilization of carbonyl carbon.'
        ]
    },
    {
        id: 'che-rxn-19',
        name: 'Iodoform Reaction (Haloform Test)',
        chapterId: 'chemistry-8-1',
        reactants: ['Compounds containing CH3-C=O or CH3-CH(OH)- group'],
        reagents: 'Iodine (I2) + Aqueous sodium hydroxide (NaOH) or NaOI',
        conditions: 'Warm gently (330 K)',
        products: ['Yellow crystalline precipitate of Iodoform (CHI3) with medicinal odor + Carboxylate salt (R-COONa)'],
        balancedEquation: 'R-CO-CH3 + 3 I2 + 4 NaOH -> CHI3 (yellow ppt) + R-COONa + 3 NaI + 3 H2O',
        mechanismType: 'Nucleophilic Substitution',
        syntheticUtility: 'Specific qualitative test for methyl ketones and secondary alcohols with terminal methyl group.',
        distinctionRole: 'Used to distinguish: Acetaldehyde vs other aldehydes; Pentan-2-one vs Pentan-3-one; Ethanol vs Methanol.',
        commonBoardTraps: [
            'Assuming all alcohols give iodoform: ONLY ethanol (primary) and secondary methyl carbinols (CH3-CH(OH)-R) give positive test. Methanol, propan-1-ol give negative test.'
        ]
    },
    {
        id: 'che-rxn-20',
        name: 'Aldol Condensation',
        chapterId: 'chemistry-8-1',
        reactants: ['Two molecules of Aldehyde or Ketone possessing at least one alpha-hydrogen'],
        reagents: 'Dilute alkali (10% NaOH or Ba(OH)2)',
        conditions: 'Room temperature, followed by heating to dehydrate',
        products: ['beta-Hydroxyaldehyde (aldol) or beta-hydroxyketone (ketol) --heat--> alpha,beta-unsaturated carbonyl'],
        balancedEquation: '2 CH3-CHO --dil. NaOH--> CH3-CH(OH)-CH2-CHO (3-hydroxybutanal) --heat, -H2O--> CH3-CH=CH-CHO (But-2-enal)',
        mechanismType: 'Condensation',
        mechanismSteps: [
            'Base (OH-) abstracts acidic alpha-hydrogen to generate resonance-stabilized enolate carbanion.',
            'Nucleophilic attack of enolate on the electrophilic carbonyl carbon of a second aldehyde molecule.',
            'Protonation of alkoxide oxygen by water to yield beta-hydroxy aldehyde (aldol).',
            'Dehydration upon warming: elimination of water driven by conjugation with carbonyl group.'
        ],
        syntheticUtility: 'Formation of carbon-carbon bonds and alpha,beta-unsaturated conjugated aldehydes/ketones.',
        commonBoardTraps: [
            'Aldehydes lacking alpha-hydrogens (HCHO, C6H5CHO, (CH3)3C-CHO) CANNOT undergo self-aldol condensation; they undergo Cannizzaro reaction instead.'
        ]
    },
    {
        id: 'che-rxn-21',
        name: 'Cannizzaro Reaction',
        chapterId: 'chemistry-8-1',
        reactants: ['Two molecules of Aldehyde having NO alpha-hydrogen (e.g. Formaldehyde, Benzaldehyde)'],
        reagents: 'Concentrated alkali (50% aqueous or alcoholic NaOH / KOH)',
        conditions: 'Heated with 50% alkali',
        products: ['One molecule reduced to Alcohol, one molecule oxidized to Carboxylate salt (Disproportionation)'],
        balancedEquation: '2 HCHO + conc. NaOH -> CH3OH (Methanol) + HCOONa (Sodium formate)',
        mechanismType: 'Oxidation-Reduction',
        mechanismSteps: [
            'Nucleophilic addition of OH- to carbonyl carbon of first aldehyde.',
            'Hydride transfer (H:-) from tetrahedral dianion intermediate to carbonyl carbon of second aldehyde (rate-determining step).',
            'Rapid proton exchange yielding alcohol and stable carboxylate resonance anion.'
        ],
        syntheticUtility: 'Self-redox disproportionation of non-enolizable aldehydes.',
        commonBoardTraps: [
            'Writing aldol products for formaldehyde or benzaldehyde: they lack alpha-hydrogens and undergo Cannizzaro exclusively.',
            'Cross-Cannizzaro with HCHO: Formaldehyde is always oxidized to formate, while the other aldehyde is reduced to alcohol.'
        ]
    },
    {
        id: 'che-rxn-22',
        name: 'Hell-Volhard-Zelinsky (HVZ) Reaction',
        chapterId: 'chemistry-8-1',
        reactants: ['Carboxylic acids possessing alpha-hydrogen (R-CH2-COOH)'],
        reagents: 'Chlorine (Cl2) or Bromine (Br2) in presence of catalytic Red Phosphorus (red P)',
        conditions: 'Followed by hydrolysis with water',
        products: ['alpha-Halocarboxylic acid (R-CH(X)-COOH) + HX'],
        balancedEquation: 'R-CH2-COOH + Br2 --(1) red P / (2) H2O--> R-CH(Br)-COOH + HBr',
        mechanismType: 'Electrophilic Substitution',
        syntheticUtility: 'Selective alpha-halogenation of carboxylic acids; precursor for alpha-amino acids (by reaction with NH3) and alpha-hydroxy acids (by reaction with KOH).',
        commonBoardTraps: [
            'Formic acid (HCOOH) and benzoic acid (C6H5COOH) do NOT undergo HVZ because they have no alpha-hydrogens.'
        ]
    },
    // Amines (chemistry-9-1)
    {
        id: 'che-rxn-23',
        name: 'Gabriel Phthalimide Synthesis',
        chapterId: 'chemistry-9-1',
        reactants: ['Phthalimide + Primary alkyl halide (R-X)'],
        reagents: '1. Ethanolic KOH; 2. Alkyl halide (R-X); 3. Aqueous NaOH (alkaline hydrolysis)',
        conditions: 'Reflux',
        products: ['Pure primary aliphatic amine (R-NH2) + Sodium phthalate'],
        balancedEquation: 'C6H4(CO)2NH + KOH -> C6H4(CO)2N- K+ --R-X--> C6H4(CO)2N-R --2 NaOH (aq)--> R-NH2 + C6H4(COONa)2',
        mechanismType: 'Nucleophilic Substitution',
        syntheticUtility: 'Exclusive synthetic route to produce pure 1° aliphatic amines uncontaminated by 2° or 3° amines.',
        commonBoardTraps: [
            'Cannot be used to prepare aromatic primary amines (e.g. aniline): aryl halides cannot undergo nucleophilic SN2 substitution with phthalimide anion due to partial double bond resonance.'
        ]
    },
    {
        id: 'che-rxn-24',
        name: 'Hoffmann Bromamide Degradation',
        chapterId: 'chemistry-9-1',
        reactants: ['Primary acid amide (R-CONH2 or Ar-CONH2)'],
        reagents: 'Bromine (Br2) + 4 equivalents of aqueous or ethanolic KOH',
        conditions: 'Warm gently (343 K)',
        products: ['Primary amine (R-NH2) containing ONE LESS carbon atom + K2CO3 + 2 KBr + 2 H2O'],
        balancedEquation: 'R-CONH2 + Br2 + 4 KOH -> R-NH2 + K2CO3 + 2 KBr + 2 H2O',
        mechanismType: 'Rearrangement',
        syntheticUtility: 'Step-down degradation reaction for descending a homologous series (e.g. converting ethanamide to methanamine).',
        commonBoardTraps: [
            'The product amine has ONE LESS carbon atom than the starting amide.',
            'Stoichiometry requires exactly 4 moles of KOH and 1 mole of Br2 per mole of amide.'
        ]
    },
    {
        id: 'che-rxn-25',
        name: 'Carbylamine Reaction (Isocyanide Test)',
        chapterId: 'chemistry-9-1',
        reactants: ['Primary amine (Aliphatic or Aromatic: R-NH2 or Ar-NH2)'],
        reagents: 'Chloroform (CHCl3) + Alcoholic potassium hydroxide (3 KOH)',
        conditions: 'Heat gently',
        products: ['Carbylamine / Isocyanide (R-NC) with extremely offensive foul smell + 3 KCl + 3 H2O'],
        balancedEquation: 'R-NH2 + CHCl3 + 3 KOH (alc.) --heat--> R-NC (foul smell) + 3 KCl + 3 H2O',
        mechanismType: 'Elimination',
        syntheticUtility: 'Distinction test for primary amines.',
        distinctionRole: 'ONLY primary amines give positive foul-smelling carbylamine test. Secondary and tertiary amines do not react.',
        commonBoardTraps: [
            'Both aliphatic 1° amines (ethylamine) and aromatic 1° amines (aniline) give positive test.'
        ]
    },
    {
        id: 'che-rxn-26',
        name: 'Hinsberg Test',
        chapterId: 'chemistry-9-1',
        reactants: ['Primary, Secondary, or Tertiary amine'],
        reagents: 'Benzenesulphonyl chloride (C6H5SO2Cl, Hinsberg’s reagent) + aqueous KOH',
        conditions: 'Shake at room temperature',
        products: ['1° gives sulfonamide soluble in alkali; 2° gives sulfonamide insoluble in alkali; 3° does not react'],
        balancedEquation: '1°: C6H5SO2Cl + R-NH2 -> C6H5SO2NH-R (soluble in KOH due to acidic N-H) | 2°: C6H5SO2Cl + R2NH -> C6H5SO2NR2 (insoluble in KOH) | 3°: No reaction',
        mechanismType: 'Nucleophilic Substitution',
        syntheticUtility: 'Complete analytical separation and distinction of 1°, 2°, and 3° amines.',
        distinctionRole: '1° amine precipitate dissolves in KOH; 2° amine precipitate remains insoluble in KOH; 3° amine does not react.',
        commonBoardTraps: [
            'Why 1° sulfonamide dissolves in alkali: the hydrogen attached to nitrogen is strongly acidic due to electron-withdrawing SO2 group.'
        ]
    },
    {
        id: 'che-rxn-27',
        name: 'Diazotization Reaction',
        chapterId: 'chemistry-9-1',
        reactants: ['Aniline (C6H5-NH2)'],
        reagents: 'Sodium nitrite (NaNO2) + Concentrated hydrochloric acid (HCl) [generating HNO2 in situ]',
        conditions: 'Ice-cold temperature strictly maintained at 273–278 K (0–5 °C)',
        products: ['Benzenediazonium chloride (C6H5N2+ Cl-) + NaCl + 2 H2O'],
        balancedEquation: 'C6H5-NH2 + NaNO2 + 2 HCl --273-278 K--> C6H5N2+ Cl- + NaCl + 2 H2O',
        mechanismType: 'Electrophilic Addition',
        syntheticUtility: 'Cornerstone reaction in synthetic organic chemistry converting primary aromatic amines into diazonium salts.',
        commonBoardTraps: [
            'Temperature must not exceed 278 K (5 °C): at higher temperatures, diazonium salt decomposes immediately releasing N2 and forming phenol.',
            'Aliphatic primary amines cannot form stable diazonium salts; they decompose instantly to give alcohol and nitrogen gas.'
        ]
    },
    {
        id: 'che-rxn-28',
        name: 'Azo Coupling Reaction with Phenol',
        chapterId: 'chemistry-9-1',
        reactants: ['Benzenediazonium chloride (C6H5N2+ Cl-) + Phenol (C6H5OH)'],
        reagents: 'Weakly basic alkaline medium (pH 9–10)',
        conditions: '273–278 K',
        products: ['p-Hydroxyazobenzene (Orange dye) + Cl- + H2O'],
        balancedEquation: 'C6H5N2+ Cl- + C6H5OH --pH 9-10, 273-278 K--> C6H5-N=N-C6H4-OH(p) (orange dye) + HCl',
        mechanismType: 'Electrophilic Substitution',
        syntheticUtility: 'Synthesis of intensely colored azo dyes containing the -N=N- chromophore.',
        distinctionRole: 'Used to confirm presence of aromatic diazonium salts or aniline via orange dye precipitation.',
        commonBoardTraps: [
            'pH must be weakly alkaline (pH 9–10) for phenol coupling to convert phenol into more reactive phenoxide ion.',
            'Coupling occurs predominantly at the para-position to the -OH group.'
        ]
    },
    {
        id: 'che-rxn-29',
        name: 'Azo Coupling Reaction with Aniline',
        chapterId: 'chemistry-9-1',
        reactants: ['Benzenediazonium chloride (C6H5N2+ Cl-) + Aniline (C6H5NH2)'],
        reagents: 'Weakly acidic medium (pH 4–5)',
        conditions: '273–278 K',
        products: ['p-Aminoazobenzene (Yellow dye) + Cl- + H2O'],
        balancedEquation: 'C6H5N2+ Cl- + C6H5NH2 --pH 4-5, 273-278 K--> C6H5-N=N-C6H4-NH2(p) (yellow dye) + HCl',
        mechanismType: 'Electrophilic Substitution',
        syntheticUtility: 'Synthesis of yellow azo dyes.',
        distinctionRole: 'Used to detect aromatic primary amines by dye test.',
        commonBoardTraps: [
            'For aniline coupling, pH must be weakly acidic (pH 4–5). In strongly acidic medium, aniline is protonated to anilinium ion which is non-nucleophilic.'
        ]
    }
];
export const reactionById = (id) => cbseNamedReactions.find(r => r.id === id);
export const reactionsForChapter = (chapterId) => cbseNamedReactions.filter(r => r.chapterId === chapterId);
