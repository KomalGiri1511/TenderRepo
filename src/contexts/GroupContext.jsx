import React, { createContext, useContext, useState } from 'react';

/**
 * @typedef {object} Group
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number} members
 * @property {string} category
 * @property {string} image
 */

/**
 * @typedef {object} GroupContextType
 * @property {Group[]} groups
 * @property {(groupId: number, updatedData: Partial<Group>) => void} updateGroup
 * @property {(groupId: number) => void} deleteGroup
 * @property {(group: Omit<Group, 'id'>) => void} addGroup
 */

/**
 * @type {React.Context<GroupContextType | undefined>}
 */
const GroupContext = createContext(undefined);

/**
 * Provides group data and management functions to its children.
 * @param {object} props
 * @param {React.ReactNode} props.children - The child components that will consume the context.
 */
export function GroupProvider({ children }) {
  const [groups, setGroups] = useState([
    // Learner-Focused Groups
    { 
      id: 1, 
      nameKey: 'skillBuilders',
      members: 1250, 
      category: 'Learner-Focused', 
      image: '/assets/grp1.PNG'
    },
    { 
      id: 2, 
      nameKey: 'rightsAwareness',
      members: 845, 
      category: 'Learner-Focused', 
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop&auto=format'
    },
    
    // Trainer-Focused Groups
    { 
      id: 3, 
      nameKey: 'trainerConnect',
      members: 320, 
      category: 'Trainer-Focused', 
      image: '/assets/grp2.PNG'
    },
    { 
      id: 4, 
      nameKey: 'contentInnovators',
      members: 275, 
      category: 'Trainer-Focused', 
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop&auto=format'
    },
    
    // Employer-Focused Groups
    { 
      id: 5, 
      nameKey: 'workplaceChampions',
      members: 485, 
      category: 'Employer-Focused', 
      image: '/assets/grp3.PNG'
    },
    { 
      id: 6, 
      nameKey: 'complianceCircle',
      members: 392, 
      category: 'Employer-Focused', 
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop&auto=format'
    },
    
    // Mixed / Initiative-Wide Groups
    { 
      id: 7, 
      nameKey: 'campaignCatalysts',
      members: 1580, 
      category: 'Initiative-Wide', 
      image: '/assets/grp4.PNG'
    },
    { 
      id: 8, 
      nameKey: 'eventSpotlight',
      members: 1245, 
      category: 'Initiative-Wide', 
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&auto=format'
    },
  ]);

  /**
   * Updates a group's data.
   * @param {number} groupId - The ID of the group to update.
   * @param {Partial<Group>} updatedData - An object with the group properties to update.
   */
  const updateGroup = (groupId, updatedData) => {
    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId ? { ...group, ...updatedData } : group
      )
    );
  };

  /**
   * Deletes a group by its ID.
   * @param {number} groupId - The ID of the group to delete.
   */
  const deleteGroup = (groupId) => {
    setGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
  };

  /**
   * Adds a new group to the list.
   * @param {Omit<Group, 'id'>} newGroup - The new group data, without an ID.
   */
  const addGroup = (newGroup) => {
    const id = groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1;
    setGroups(prevGroups => [...prevGroups, { ...newGroup, id }]);
  };

  return (
    <GroupContext.Provider value={{ groups, updateGroup, deleteGroup, addGroup }}>
      {children}
    </GroupContext.Provider>
  );
}

/**
 * Custom hook to consume the GroupContext.
 * @returns {GroupContextType} The context value.
 */
export function useGroup() {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error('useGroup must be used within a GroupProvider');
  }
  return context;
}