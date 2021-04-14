import { useEffect } from 'react';
import { getItems, getReceipts } from '../database';
import { auth } from '../firebase';

export default function usePaymentInfo(
    callback,
    groupId,
    groupMembers,
    currency
) {
    useEffect(async () => {
        const items = await getItems(groupId);
        const receipts = await getReceipts(groupId);

        const itemsMap = joinItemsAndReceipts(items, receipts);
        let debtMap = collectDebt(itemsMap, groupMembers);
        if (debtMap) {
            debtMap = getRelevantDebtData(debtMap);
            transform(debtMap, groupMembers, currency);
            callback(Array.from(debtMap));
        }
    }, [groupId, groupMembers, currency]);
}

/**
 * Adds the Scanner ID field to all items and return them as a map
 * @param {Object} items
 * @param {Object} receipts
 * @returns map of the new items
 */
function joinItemsAndReceipts(items, receipts) {
    const itemsMap = new Map();

    // Put every item in a map, so it will be faster to "join" it with the receipt
    for (const item of items) {
        itemsMap.set(item.key, item.value);
    }

    for (let receipt of receipts) {
        receipt = receipt.value;
        if (receipt.items != null) {
            for (const item of Object.keys(receipt.items)) {
                const currentItem = itemsMap.get(item);
                currentItem.scannerID = receipt.scannerID;
                itemsMap.set(item, currentItem);
            }
        }
    }

    return itemsMap;
}

function collectDebt(itemsMap, groupMembers) {
    // Every member has a map of users with the amount of debt towards them
    const memberDebtMap = new Map();
    for (const member of groupMembers) {
        memberDebtMap.set(member.key, new Map());
    }

    for (const item of itemsMap.values()) {
        // Calculate the price every payer has to pay

        const numberOfPayers = Object.values(item.payerIDs).reduce((acc, val) =>
            val == true ? acc + 1 : acc
        );
        const priceForEach = item.price / numberOfPayers;

        // Get an array of the payerIDs except for the scanner
        const hasToPayScanner = Object.entries(item.payerIDs)
            .filter((entry) => {
                if (entry[1] == true && entry[0] != item.scannerID) {
                    return true;
                }
                return false;
            })
            .map((payer) => payer[0]);

        for (const payerID of hasToPayScanner) {
            //console.log(priceForEach + ' ' + payerID);
            addDebt(memberDebtMap, payerID, item.scannerID, priceForEach);
        }
    }
    return memberDebtMap;
}

/**
 * Adds the debt amount to map
 * @param {Map<String, Map<String, Number>>} debtMap
 * @param {String} debtor id of the person who owes money to the creditor
 * @param {String} creditor id of the creditor who payed for the receipt
 */
function addDebt(debtMap, debtor, creditor, amount) {
    const mapOfDebtor = debtMap.get(debtor);
    if (!mapOfDebtor) return;
    if (mapOfDebtor.has(creditor)) {
        const currentDebt = mapOfDebtor.get(creditor);
        mapOfDebtor.set(creditor, currentDebt + amount);
        debtMap.set(debtor, mapOfDebtor);
    } else {
        mapOfDebtor.set(creditor, amount);
        debtMap.set(debtor, mapOfDebtor);
    }
}

/**
 * Gets the relevant data from the debtMap that applies to the current user and return it
 * @param {Map<>} debtMap
 * @returns return a map of UserIDs and debts the amount indicates how much you owe them
 */
function getRelevantDebtData(debtMap) {
    //console.log(debtMap);
    const userID = auth.currentUser.uid;

    const iOwe = Array.from(debtMap.get(userID)?.entries() || []);

    const othersOweMe = [];
    for (const [payerID, map] of debtMap.entries()) {
        if (map.has(userID)) {
            const amount = map.get(userID);
            othersOweMe.push([payerID, amount]);
        }
    }

    const relevantDebtMap = mergeDebts(iOwe, othersOweMe);

    //console.log(relevantDebtMap);
    return relevantDebtMap;
}

/**
 * Calculates the total amount that is owed to the user, and that a user owes to others
 * @param {Array<[String, Number]>} iOwe
 * @param {Array<[String, Number]>} othersOweMe
 * @returns the merged array
 */
function mergeDebts(iOwe, othersOweMe) {
    const merged = new Map();
    //console.log(iOwe);
    //console.log(othersOweMe);
    if (iOwe?.length > 0) {
        for (const [key, value] of iOwe) {
            merged.set(key, -value);
        }
    }
    if (othersOweMe?.length > 0) {
        for (const [key, value] of othersOweMe) {
            if (merged.has(key)) {
                const current = merged.get(key);
                merged.set(key, current + value);
            } else {
                merged.set(key, value);
            }
        }
    }
    return merged;
}

function transform(debtMap, groupMembers, currency) {
    if (groupMembers?.length > 0) {
        for (const member of groupMembers) {
            if (debtMap.has(member.key)) {
                const currentAmount = debtMap.get(member.key);
                debtMap.set(member.key, {
                    amount: currentAmount,
                    username: member.username,
                    currency: currency,
                    profile_picture: member.profile_picture,
                });
            }
        }
    }
}
