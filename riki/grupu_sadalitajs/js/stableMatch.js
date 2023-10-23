// Function to sort people into groups
export function stableMatchMembers(peopleData, numGroups) {
    // Create an array to store the groups
    const groups = new Array(numGroups).fill().map(() => []);

    // Sort people by their average preference score
    const sortedPeople = peopleData.sort((a, b) => {
        const avgA = a.preferences.reduce((sum, pref) => sum + pref, 0) / a.preferences.length;
        const avgB = b.preferences.reduce((sum, pref) => sum + pref, 0) / b.preferences.length;
        return avgB - avgA;
    });

    // Distribute people into groups
    sortedPeople.forEach((person, index) => {
        const groupIndex = index % numGroups;
        groups[groupIndex].push(person.name);
    });

    return groups;
}
