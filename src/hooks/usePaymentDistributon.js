import { useEffect } from 'react';
import { getItems } from '../database';

export default function usePaymentDistributon(callback, groupId, groupMembers) {
    useEffect(async () => {
        const items = await getItems(groupId);
        const data = calulateTotalForUsers(items, groupMembers);
        const result = formatData(data, groupMembers);
        callback(result);
    });
}

function calulateTotalForUsers(items, groupMembers) {
    const map = new Map();

    // Initializes a map with all the users
    for (const member of groupMembers) {
        map.set(member.key, 0.0);
    }

    // Calculates the total a user has payed
    for (const item of items) {
        const numberOfPayers = Object.values(
            item.value.payerIDs
        ).reduce((acc, val) => (val == true ? acc + 1 : acc));
        const priceForEach = item.value.price / numberOfPayers;
        for (const [payerID, value] of Object.entries(item.value.payerIDs)) {
            if (value == true) {
                const prevValue = map.get(payerID);
                map.set(payerID, prevValue + priceForEach);
            }
        }
    }
    return map;
}

function formatData(data, groupMembers) {
    const result = [];
    for (const member of groupMembers) {
        result.push({
            id: member.username,
            label: member.username,
            value: data.get(member.key),
            color: 'hsl(274, 70%, 50%)',
        });
    }

    return result;
}
