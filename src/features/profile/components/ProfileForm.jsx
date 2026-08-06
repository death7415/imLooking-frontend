import { useState, useEffect } from 'react'
import { Button } from '../../../shared/ui/button/Button.jsx'
import './ProfileForm.css'

export function ProfileForm({ profileData, isEditing, onSave, onCancel }) {
  const [formData, setFormData] = useState(profileData)

  useEffect(() => {
    setFormData(profileData)
  }, [profileData, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTagsChange = (e) => {
    const value = e.target.value
    const tags = value.split(',').map(t => t.trim()).filter(Boolean)
    setFormData(prev => ({ ...prev, interests: tags }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isEditing) {
    return (
      <div className="profile-view">
        <div className="profile-section">
          <h2 className="profile-section__title">About Me</h2>
          <p className="profile-section__text">{profileData.bio || "No bio added yet."}</p>
        </div>

        <div className="profile-section">
          <h2 className="profile-section__title">Basics</h2>
          <div className="profile-grid">
            <div className="profile-grid__item">
              <span className="profile-grid__label">Gender</span>
              <span className="profile-grid__value">{profileData.gender || "—"}</span>
            </div>
            <div className="profile-grid__item">
              <span className="profile-grid__label">Height</span>
              <span className="profile-grid__value">{profileData.height || "—"}</span>
            </div>
            <div className="profile-grid__item">
              <span className="profile-grid__label">Astrological Sign</span>
              <span className="profile-grid__value">{profileData.astrologicalSign || "—"}</span>
            </div>
            <div className="profile-grid__item">
              <span className="profile-grid__label">Work</span>
              <span className="profile-grid__value">{profileData.work || "—"}</span>
            </div>
            <div className="profile-grid__item">
              <span className="profile-grid__label">Education</span>
              <span className="profile-grid__value">{profileData.education || "—"}</span>
            </div>
            <div className="profile-grid__item">
              <span className="profile-grid__label">Looking For</span>
              <span className="profile-grid__value">{profileData.lookingFor || "—"}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2 className="profile-section__title">Interests & Tags</h2>
          <div className="profile-tags">
            {profileData.interests && profileData.interests.length > 0 ? (
              profileData.interests.map((tag, index) => (
                <span key={index} className="profile-tag">{tag}</span>
              ))
            ) : (
              <span className="profile-section__text">No interests added.</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form__group">
        <label className="profile-form__label" htmlFor="bio">About Me</label>
        <textarea 
          className="profile-form__input profile-form__textarea"
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          placeholder="Write a short bio..."
        />
      </div>

      <div className="profile-form__row">
        <div className="profile-form__group">
          <label className="profile-form__label" htmlFor="gender">Gender</label>
          <input 
            className="profile-form__input"
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="e.g. Woman, Man, Non-binary"
          />
        </div>
        <div className="profile-form__group">
          <label className="profile-form__label" htmlFor="height">Height</label>
          <input 
            className="profile-form__input"
            type="text"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="e.g. 5'7&quot;"
          />
        </div>
      </div>

      <div className="profile-form__row">
        <div className="profile-form__group">
          <label className="profile-form__label" htmlFor="work">Work</label>
          <input 
            className="profile-form__input"
            type="text"
            id="work"
            name="work"
            value={formData.work}
            onChange={handleChange}
            placeholder="e.g. Tech Company"
          />
        </div>
        <div className="profile-form__group">
          <label className="profile-form__label" htmlFor="education">Education</label>
          <input 
            className="profile-form__input"
            type="text"
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="e.g. NYU"
          />
        </div>
      </div>

      <div className="profile-form__row">
        <div className="profile-form__group">
          <label className="profile-form__label" htmlFor="astrologicalSign">Astrological Sign</label>
          <select 
            className="profile-form__input"
            id="astrologicalSign"
            name="astrologicalSign"
            value={formData.astrologicalSign}
            onChange={handleChange}
          >
            <option value="">Select a sign...</option>
            {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(sign => (
              <option key={sign} value={sign}>{sign}</option>
            ))}
          </select>
        </div>
        <div className="profile-form__group">
          <label className="profile-form__label" htmlFor="lookingFor">Looking For</label>
          <select 
            className="profile-form__input"
            id="lookingFor"
            name="lookingFor"
            value={formData.lookingFor}
            onChange={handleChange}
          >
            <option value="">Select intent...</option>
            <option value="Long-term relationship">Long-term relationship</option>
            <option value="Short-term, open to long">Short-term, open to long</option>
            <option value="Short-term fun">Short-term fun</option>
            <option value="New friends">New friends</option>
            <option value="Still figuring it out">Still figuring it out</option>
          </select>
        </div>
      </div>

      <div className="profile-form__group">
        <label className="profile-form__label" htmlFor="interests">Interests & Tags (Comma separated)</label>
        <input 
          className="profile-form__input"
          type="text"
          id="interests"
          name="interests"
          value={formData.interests?.join(', ') || ''}
          onChange={handleTagsChange}
          placeholder="e.g. Coffee, Hiking, Museums"
        />
      </div>

      <div className="profile-form__actions">
        <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" type="submit">Save Profile</Button>
      </div>
    </form>
  )
}
