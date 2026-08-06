import { Button } from '../../../shared/ui/button/Button.jsx'
import './ProfileHeader.css'

export function ProfileHeader({ profileData, isEditing, onEditToggle }) {
  return (
    <header className="profile-header">
      <div className="profile-header__avatar-wrapper">
        <img 
          src={profileData.avatarUrl} 
          alt={`${profileData.fullName}'s avatar`} 
          className="profile-header__avatar"
        />
        {isEditing && (
          <button className="profile-header__avatar-edit-btn" aria-label="Edit Avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </button>
        )}
      </div>

      <div className="profile-header__info">
        <h1 className="profile-header__name">{profileData.fullName}, {profileData.age}</h1>
        <p className="profile-header__handle">@{profileData.username}</p>
        <p className="profile-header__location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {profileData.location}
        </p>
      </div>

      <div className="profile-header__actions">
        <Button variant={isEditing ? "outline" : "primary"} onClick={onEditToggle}>
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </Button>
      </div>
    </header>
  )
}
