import { useState } from 'react';
import { TeamMemberPanel } from './TeamMemberPanel';
import { PersonData } from '@/interfaces';

export function ParentComponent() {
  const [selectedMember, setSelectedMember] = useState('home');
  const teamData: PersonData[] = [
    // ... your team data here
  ];

  const handleMemberSelect = (memberId: string) => {
    console.log("ParentComponent - Selecting member:", memberId);
    setSelectedMember(memberId);
  };

  return (
    <div>
      <TeamMemberPanel
        data={teamData}
        selectedMember={selectedMember}
        onMemberSelect={handleMemberSelect}
      />
      {/* Rest of your component */}
    </div>
  );
}
