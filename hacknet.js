/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("sleep")
	ns.disableLog("getServerMoneyAvailable")
	ns.tail();
	//Set levels you want
	const hackNetLevel = 120;
	const hackNetCoreLevel = 30;

	var totalMoney = 0
	while (true) {
		var maxHashRate = 0;
		if ((ns.hacknet.numHashes()) >= 4) {
			ns.hacknet.spendHashes("Sell for Money");
			totalMoney += 1000000;

			//	ns.formulas.hacknetServers.hashGainRate()

		}
		ns.clearLog();
		ns.print("Current Node Total: " + ns.hacknet.numNodes() + "/" + ns.hacknet.maxNumNodes())
		ns.print("Total Money: $" + ns.nFormat(totalMoney, "000,000"));
		var myMoney = ns.getServerMoneyAvailable("home");
		ns.print("My Money: $" + ns.nFormat(myMoney, "000,000"));
		let nodeCost = ns.hacknet.getPurchaseNodeCost();
		let percentThere = (myMoney / nodeCost) * 100;
		ns.print("Next Node Purchase: " + ns.nFormat(percentThere, "0.00") + "%");
		maxHashRate = getHashRate();
		ns.print("Max node production: " + ns.nFormat(maxHashRate, "0.000") + " h/s")
		//buyNode();
		//upgradeHacknet();
		await ns.sleep(10)
	}
	function buyNode() {
		if ((ns.hacknet.getPurchaseNodeCost()) <= (ns.getServerMoneyAvailable("home")) && (ns.hacknet.numNodes()) < (ns.hacknet.maxNumNodes())) {
			ns.hacknet.purchaseNode();
			//ns.hacknet.upgradeLevel(indexPurchase, 199)
			ns.print("Purchased Node!!!!!");
		}
	}
	function getHashRate() {
		for (let i = 0; i < ns.hacknet.numNodes(); i++) {
			var hns = ns.hacknet.getNodeStats(i);
			maxHashRate += hns.production;
		}
		return maxHashRate;
	}
	function upgradeHacknet() {
		for (let i = 0; i < ns.hacknet.numNodes(); i++) {
			//ns.tprint("current node is: " + i)
			var hns = ns.hacknet.getNodeStats(i);
			//RAM Upgrade to MAX
			if (ns.hacknet.getRamUpgradeCost(i, 1) <= ns.getServerMoneyAvailable("home")) {
				//if (hns.ram < 16) {
					ns.hacknet.upgradeRam(i, 1);
					ns.print("Hacknet: " + i + "'s RAM upgraded to " + (hns.ram * 2) + "GB")
				//}
			}
			//Core upgrade
			if (ns.hacknet.getCoreUpgradeCost(i, 1) <= ns.getServerMoneyAvailable("home")) {
				if (hns.cores < hackNetCoreLevel) {
					ns.hacknet.upgradeCore(i, 1);
					ns.print("Hacknet: " + i + "'s Core Level is now " + (hns.cores + 1))
				}
			}
			//Level Upgrade
			if (ns.hacknet.getLevelUpgradeCost(i, 1) <= ns.getServerMoneyAvailable("home")) {
				if (hns.level < hackNetLevel) {
					ns.hacknet.upgradeLevel(i, 1);
					ns.print("Hacknet: " + i + "'s Level is now " + (hns.level + 1));
				}
			}

		}
	}
}