/** @param {NS} ns **/
export async function main(ns) {
	const myGang = ["Thug-0", "Thug-1", "Thug-2", "Thug-3", "Thug-4", "Thug-5", "Thug-6", "Thug-7", "Thug-8", "Thug-9", "Thug-10", "Thug-11"];
	const gangEquip = ["Baseball Bat", "Katana", "Glock 18C", "P90C", "Steyr AUG", "AK-47", "M15A10 Assault Rifle", "AWM Sniper Rifle", "Bulletproof Vest", "Full Body Armor",
		"Liquid Body Armor", "Graphene Plating Armor", "Ford Flex V20", "ATX1070 Superbike", "Mercedes-Benz S9001", "White Ferrari", "NUKE Rootkit", "Soulstealer Rootkit", "Demon Rootkit",
		"Hmap Node", "Jack the Ripper"];
	const gangAugs = ["Bionic Arms", "Bionic Legs", "Bionic Spine", "BrachiBlades", "Nanofiber Weave", "Synthetic Heart", "Synfibril Muscle", "BitWire", "Neuralstimulator",
		"DataJack", "Graphene Bone Lacings"]

	const otherGangNames = ["Tetrads", "The Syndicate", "The Dark Army", "Speakers for the Dead", "NiteSec", "The Black Hand"]

	ns.tail();
	ns.disableLog("ALL");
	while (true) {
		ns.clearLog();
		let gangInfo = ns.gang.getGangInformation();
		let gangTerritory = gangInfo.territory * 100;
		let clashChance = gangInfo.territoryClashChance;
		let gangPower = gangInfo.power;
		let gangAt85 = gangClashCapable();
		let gangWithTT = getGangWithTerritory().length;

		ns.print(`${ns.nFormat(gangInfo.moneyGainRate * 5, "000,000")}/s`);
		let augCostLeft = equipAugCostTotal() - getTotalAugsPurchasedCost();
		let weaponCostLeft = getTotalWeaponPurchasedCost() - equipWeaponCostTotal();
		ns.print("Total Aug Cost Left: $" + ns.nFormat(augCostLeft, "000,000"));
		ns.print("Total Weapon Cost: $" + ns.nFormat(equipWeaponCostTotal(), "000,000"));
		ns.print(`MyGangTT: ${ns.nFormat(gangTerritory, "0.00")}% Pwr: ${ns.nFormat(gangPower, "0,0")} WinOver85%: ${gangAt85} oGWithTT: ${gangWithTT}`)

		try {
			//Build Gang
			let members = ns.gang.getMemberNames();
			if (members.length < 12) {
				ns.print("Building Gang");
				recruit();
				buildGang();
			}
			// Build Power
			else if (!gangClashReady() && !gangInfo.territoryWarfareEngaged && gangTerritory < 100) {
				ns.print("Stage: Building power");

				let homeMoney = ns.getServerMoneyAvailable("home") - (ns.getServerMoneyAvailable("home") * .10);
				if (clashChance > 0) {
					ns.print("Stage: Lost War, building back up")
					buildGang();
				}
				else {
					// Buy Augs if you have the money edit(if): augCostLeft < homeMoney &&
					if (augCostLeft > 1) {
						buyAugs();
						//ns.print("Purchased Augs, Cost left " + augCostLeft);
					}
					//buy weapons after you bought all Augs
					if (augCostLeft < 1) {
						if (ns.getServerMoneyAvailable("home") >= homeMoney) {
							buyWeapons();
						}
					}
					buildGangPower();
				}
			}
			// Start Territory Warfare & Build Money
			else if (gangTerritory < 100) {
				ns.print("Stage: Engaging Warfare");
				if (gangClashReady()) {
					ns.gang.setTerritoryWarfare(true);
					if (ns.getServerMoneyAvailable("home") >= equipWeaponCostTotal()) {
						buyWeapons();
					}
					buyAugs();
					buildGangMoney();
				}
				else {
					ns.gang.setTerritoryWarfare(false);
				}
			}
			// Have all Territory, Build Money
			else {
				ns.print("Stage: Won the war");
				ns.gang.setTerritoryWarfare(false);
				buyWeapons();
				buyAugs();
				buildGangMoney();
			}
		}
		catch (error) {
			//ns.tprint(error);
		}
		await ns.sleep(200)
	}
	function buildGang() {
		for (let gangMember of ns.gang.getMemberNames()) {
			const memberinfo = ns.gang.getMemberInformation(gangMember);
			const gangInfo = ns.gang.getGangInformation();
			let gangRespect = gangInfo.respect;
			const memberAscResult = ns.gang.getAscensionResult(gangMember);
			let ascmulti = ns.formulas.gang.ascensionMultiplier(memberinfo.str_asc_points);

			if (memberAscResult !== undefined) {
				let newAscMulti = ascmulti * memberAscResult.str;
				ns.print(`${gangMember}: AscMulti: ${ascmulti.toPrecision(4)} AscResult: ${memberAscResult.str.toPrecision(4)} NewMulti: ${newAscMulti.toPrecision(4)}`)
				if (ascmulti < 20) {
					if (memberAscResult.str >= 1.06) {
						ns.gang.ascendMember(gangMember);
						ns.gang.setMemberTask(gangMember, "Train Combat");
						ns.toast("Gangmember: " + gangMember + " Ascended", "success", 5000);
					}
				}
				else {
					ns.gang.setMemberTask(gangMember, "Terrorism");
					ns.print(`WARN Respect: ${ns.nFormat(gangRespect, "000,000.00")} `);
				}
			}
			else {
				ns.print(`WARN ${gangMember}: Status is undefined please wait`);
			}
		}
	}
	function buildGangPower() {
		for (let gangMember of myGang) {
			let memberinfo = ns.gang.getMemberInformation(gangMember);
			const memberAscResult = ns.gang.getAscensionResult(gangMember);
			let ascmulti = ns.formulas.gang.ascensionMultiplier(memberinfo.str_asc_points);

			if (memberAscResult !== undefined) {
				let newAscMulti = ascmulti * memberAscResult.str;
				ns.print(`${gangMember}: AscMulti: ${ascmulti.toPrecision(4)} AscResult: ${memberAscResult.str.toPrecision(4)} NewMulti: ${newAscMulti.toPrecision(4)}`)
				if (memberAscResult.str >= 1.05) {
					ns.gang.ascendMember(gangMember);
					ns.gang.setMemberTask(gangMember, "Train Combat");
					ns.toast("Gangmember: " + gangMember + " Ascended", "success", 5000);
				}
				else if ((memberinfo.str >= 1000) && (memberAscResult.str >= 1.02)) {
					ns.gang.setMemberTask(gangMember, "Territory Warfare")
					ns.print(`WARN ${gangMember} is now doing Territory Warfare `);
				}

				else { ns.print(`ERROR ${gangMember} is now training`); }
			}
		}
	}
	function buildGangMoney() {
		for (let gangMember of myGang) {
			let memberinfo = ns.gang.getMemberInformation(gangMember);
			const memberAscResult = ns.gang.getAscensionResult(gangMember);
			let ascmulti = ns.formulas.gang.ascensionMultiplier(memberinfo.str_asc_points);
			if (memberAscResult !== undefined) {
				let newAscMulti = ascmulti * memberAscResult.str;
				ns.print(`${gangMember}: AscMulti: ${ascmulti.toPrecision(4)} AscResult: ${memberAscResult.str.toPrecision(4)} NewMulti: ${newAscMulti.toPrecision(4)}`)

				if (memberAscResult.str >= 1.05) {
					ns.gang.ascendMember(gangMember);
					ns.gang.setMemberTask(gangMember, "Train Combat");
					ns.toast("Gangmember: " + gangMember + " Ascended", "success", 5000);
				}
				else if ((memberinfo.str >= 1000) && (memberAscResult.str >= 1.02)) {
					ns.gang.setMemberTask(gangMember, "Human Trafficking")
					ns.print(`WARN ${gangMember} is now doing Human Trafficking`);
				}
				else { ns.print(`ERROR ${gangMember} is now training`); }
			}
		}
	}
	function recruit() {
		if (ns.gang.canRecruitMember()) {
			let members = ns.gang.getMemberNames();
			let memberName = "Thug-" + members.length;
			ns.print("Recruit new gang member " + memberName);
			ns.gang.recruitMember(memberName);
			ns.gang.setMemberTask(memberName, "Train Combat");
		}
	}
	function getGangWithTerritory() {
		let spliceremove = []
		for (let ii in otherGangNames) {

			// If other gang has 0 territory, remove them; you can't clash with 0 territory gangs
			if (ns.gang.getOtherGangInformation()[otherGangNames[ii]]['territory'] == 0) {
				spliceremove.push(ii)
			}
			//ns.print(ns.gang.getOtherGangInformation()[otherGangNames[ii]]['territory']);
		}
		if (spliceremove.length > 0) {
			for (let ii in spliceremove.reverse()) {
				otherGangNames.splice(spliceremove[ii], 1)
			}
		}
		return otherGangNames;
	}
	function gangClashReady() {
		let gangOverAmount = 0;
		for (let gangName of getGangWithTerritory()) {
			let clashChance = ns.gang.getChanceToWinClash(gangName) * 100;
			if (clashChance > 85) {
				gangOverAmount++;
			}
		}
		if (gangOverAmount == getGangWithTerritory().length) {
			return true;
		}
		else {
			return false;
		}
	}
	function gangClashCapable() {
		let clashAmount = 0;
		for (let gangName of getGangWithTerritory()) {
			let clashChance = ns.gang.getChanceToWinClash(gangName) * 100;
			if (clashChance > 85) {
				clashAmount++;
			}
		}
		return clashAmount;
	}
	function buyWeapons() {
		for (let gangMember of ns.gang.getMemberNames()) {
			for (let weapon of gangEquip) {
				let datetime = " " + new Date().today() + " @ " + new Date().timeNow();
				let equipCost = ns.gang.getEquipmentCost(weapon);
				let buyWeapons = ns.gang.purchaseEquipment(gangMember, weapon);
				if (buyWeapons) {
					ns.tprint(gangMember + " purchased for " + ns.nFormat(equipCost, "000,000") + " " + weapon + datetime)
				}
			}
		}
	}
	function buyAugs() {
		for (let gangMember of ns.gang.getMemberNames()) {
			for (let aug of gangAugs) {
				let datetime = " " + new Date().today() + " @ " + new Date().timeNow();
				let equipCost = ns.gang.getEquipmentCost(aug);
				let buyWeapons = ns.gang.purchaseEquipment(gangMember, aug);
				if (buyWeapons) {
					ns.tprint(gangMember + " purchased for " + ns.nFormat(equipCost, "000,000") + " " + aug + datetime)
				}
			}
		}
	}
	function getTotalAugsPurchasedCost() {
		let totalCost = 0
		for (let member of ns.gang.getMemberNames()) {
			let memberInfo = ns.gang.getMemberInformation(member);
			let memberAugs = memberInfo.augmentations;

			for (let aug of memberAugs) {
				let equipCost = ns.gang.getEquipmentCost(aug);
				totalCost += equipCost;
			}
		}
		return totalCost
	}
	function getTotalWeaponPurchasedCost() {
		let totalCost = 0
		for (let member of ns.gang.getMemberNames()) {
			let memberInfo = ns.gang.getMemberInformation(member);
			let memberAugs = memberInfo.augmentations;

			for (let weapon of memberAugs) {
				let equipCost = ns.gang.getEquipmentCost(weapon);
				totalCost += equipCost;
			}
		}
		return totalCost;
	}
	function equipAugCostTotal() {
		let members = ns.gang.getMemberNames();
		let totalCost = 0;
		for (let aug of gangAugs) {
			let equipCost = ns.gang.getEquipmentCost(aug);
			totalCost += equipCost;
		}
		return totalCost * members.length;
	}
	function equipWeaponCostTotal() {
		let members = ns.gang.getMemberNames();
		let totalCost = 0;
		for (let weapon of gangEquip) {
			let equipCost = ns.gang.getEquipmentCost(weapon);
			totalCost += equipCost;
		}
		return totalCost * members.length;
	}
}
Date.prototype.timeNow = function () {
	return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}
Date.prototype.today = function () {
	return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
}