/** @param {NS} ns **/
export async function main(ns) {
    const listAug = [{ "name": "Unstable Circadian Modulator", "cost": 5000000000 }, { "name": "HemoRecirculator", "cost": 45000000 }, { "name": "Augmented Targeting I", "cost": 15000000 },
    { "name": "Augmented Targeting II", "cost": 42500000 }, { "name": "Augmented Targeting III", "cost": 115000000 }, { "name": "Synthetic Heart", "cost": 2875000000 },
    { "name": "Synfibril Muscle", "cost": 1125000000 }, { "name": "Combat Rib I", "cost": 23750000 }, { "name": "Combat Rib II", "cost": 65000000 }, { "name": "Combat Rib III", "cost": 120000000 },
    { "name": "Nanofiber Weave", "cost": 125000000 }, { "name": "NEMEAN Subdermal Weave", "cost": 3250000000 }, { "name": "Wired Reflexes", "cost": 2500000 },
    { "name": "Graphene Bone Lacings", "cost": 4250000000 }, { "name": "Bionic Spine", "cost": 125000000 }, { "name": "Graphene Bionic Spine Upgrade", "cost": 6000000000 },
    { "name": "Bionic Legs", "cost": 375000000 }, { "name": "Graphene Bionic Legs Upgrade", "cost": 4500000000 }, { "name": "Speech Processor Implant", "cost": 50000000 },
    { "name": "TITN-41 Gene-Modification Injection", "cost": 190000000 }, { "name": "Enhanced Social Interaction Implant", "cost": 1375000000 }, { "name": "BitWire", "cost": 10000000 },
    { "name": "Artificial Bio-neural Network Implant", "cost": 3000000000 }, { "name": "Artificial Synaptic Potentiation", "cost": 80000000 }, { "name": "Enhanced Myelin Sheathing", "cost": 1375000000 },
    { "name": "Neural-Retention Enhancement", "cost": 250000000 }, { "name": "Embedded Netburner Module", "cost": 250000000 }, { "name": "Embedded Netburner Module Core Implant", "cost": 2500000000 },
    { "name": "Embedded Netburner Module Core V2 Upgrade", "cost": 4500000000 }, { "name": "Embedded Netburner Module Core V3 Upgrade", "cost": 7500000000 }, { "name": "Neuralstimulator", "cost": 3000000000 },
    { "name": "Neural Accelerator", "cost": 1750000000 }, { "name": "Cranial Signal Processors - Gen I", "cost": 70000000 }, { "name": "Cranial Signal Processors - Gen II", "cost": 125000000 },
    { "name": "Cranial Signal Processors - Gen III", "cost": 550000000 }, { "name": "Cranial Signal Processors - Gen V", "cost": 2250000000 }, { "name": "Neuronal Densification", "cost": 1375000000 },
    { "name": "Nuoptimal Nootropic Injector Implant", "cost": 20000000 }, { "name": "Speech Enhancement", "cost": 12500000 }, { "name": "FocusWire", "cost": 900000000 },
    { "name": "PC Direct-Neural Interface", "cost": 3750000000 }, { "name": "PC Direct-Neural Interface Optimization Submodule", "cost": 4500000000 },
    { "name": "PC Direct-Neural Interface NeuroNet Injector", "cost": 7500000000 }, { "name": "ADR-V1 Pheromone Gene", "cost": 17500000 }, { "name": "ADR-V2 Pheromone Gene", "cost": 550000000 },
    { "name": "The Shadow's Simulacrum", "cost": 400000000 }, { "name": "Neurotrainer I", "cost": 4000000 }, { "name": "Neurotrainer II", "cost": 45000000 },
    { "name": "Neurotrainer III", "cost": 130000000 }, { "name": "HyperSight Corneal Implant", "cost": 2750000000 }, { "name": "LuminCloaking-V1 Skin Implant", "cost": 5000000 },
    { "name": "LuminCloaking-V2 Skin Implant", "cost": 30000000 }, { "name": "SmartSonar Implant", "cost": 75000000 }, { "name": "Power Recirculation Core", "cost": 180000000 },
    { "name": "QLink", "cost": 25000000000000 }, { "name": "SPTN-97 Gene Modification", "cost": 4875000000 }, { "name": "CordiARC Fusion Reactor", "cost": 5000000000 },
    { "name": "SmartJaw", "cost": 2750000000 }, { "name": "Neotra", "cost": 2875000000 }, { "name": "Xanipher", "cost": 4250000000 }, { "name": "Hydroflame Left Arm", "cost": 2500000000000 },
    { "name": "nextSENS Gene Modification", "cost": 1925000000 }, { "name": "OmniTek InfoLoad", "cost": 2875000000 }, { "name": "Photosynthetic Cells", "cost": 2750000000 },
    { "name": "BitRunners Neurolink", "cost": 4375000000 }, { "name": "The Black Hand", "cost": 550000000 }, { "name": "CRTX42-AA Gene Modification", "cost": 225000000 },
    { "name": "Neuregen Gene Modification", "cost": 375000000 }, { "name": "NutriGen Implant", "cost": 2500000 }, { "name": "PCMatrix", "cost": 2000000000 },
    { "name": "INFRARET Enhancement", "cost": 30000000 }, { "name": "DermaForce Particle Barrier", "cost": 50000000 }, { "name": "Graphene BrachiBlades Upgrade", "cost": 2500000000 },
    { "name": "Graphene Bionic Arms Upgrade", "cost": 3750000000 }, { "name": "BrachiBlades", "cost": 90000000 }, { "name": "Bionic Arms", "cost": 275000000 },
    { "name": "Social Negotiation Assistant (S.N.A)", "cost": 30000000 }];
    // sets sleeves to do crimes
    let sleeveCrime = "Homicide"; // default crime if none specified via command line
    if (ns.args.length > 0) {
        sleeveCrime = ns.args[0];
    }
    const numSleeves = ns.sleeve.getNumSleeves();
    let success = false;

    for (let i = 0; i < numSleeves; i++) {
        //ns.tprint(ns.sleeve.getInformation(i));
        //var listAug = ns.sleeve.getSleevePurchasableAugs(i);
        
        let getSleeveShock = ns.sleeve.getSleeveStats(i);
        let sleeveShock = getSleeveShock.shock;
        if (sleeveShock == 0) {
            for (let aug of listAug) {



                let buyAug = ns.sleeve.purchaseSleeveAug(i, aug.name)
                if (buyAug) {
                    ns.tprint(`Purchased ${aug.name} for Sleeve${i}`);
                }

            }

        }
        else {
            ns.tprint(`Sleeve:${i} still has shock`)
        }
        success = ns.sleeve.setToCommitCrime(i, sleeveCrime);
        //ns.tprint(listAug);
    }
    if (success) {
        ns.tprint("Set all sleeves to crime " + sleeveCrime);
    }
}