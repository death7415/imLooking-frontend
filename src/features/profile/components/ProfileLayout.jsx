import { useState } from 'react'
import { ProfileHeader } from './ProfileHeader.jsx'
import { ProfileForm } from './ProfileForm.jsx'
import './ProfileLayout.css'

export function ProfileLayout() {
  const [isEditing, setIsEditing] = useState(false)
  
  // TODO: Replace with real backend data once API is wired up.
  const [profileData, setProfileData] = useState({
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400',
    fullName: 'Jane Doe',
    username: 'janedoe99',
    bio: 'Software engineer by day, foodie by night. Looking for someone to explore the city with!',
    age: 26,
    location: 'New York, NY',
    gender: 'Woman',
    height: "5'7\"",
    astrologicalSign: 'Leo',
    work: 'Tech Company',
    education: 'NYU',
    lookingFor: 'Long-term relationship',
    interests: ['Coffee', 'Hiking', 'Museums', 'Live Music']
  })

  return (
    <div className="profile-layout">
      <div className="profile-layout__content">
        <ProfileHeader 
          profileData={profileData} 
          isEditing={isEditing} 
          onEditToggle={() => setIsEditing(!isEditing)} 
        />
        
        <ProfileForm 
          profileData={profileData}
          isEditing={isEditing}
          onSave={(newData) => {
            setProfileData({ ...profileData, ...newData })
            setIsEditing(false)
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    </div>
  )
}
