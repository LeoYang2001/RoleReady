import { useState } from "react";
import {
  ChevronRight,
  User,
  Briefcase,
  Code,
  Check,
} from "lucide-react";
import "./ResumeBuilder.css";

interface BasicInfo {
  name: string;
  email: string;
  linkedin: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  graduationYear: string;
}

interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  duration: string;
  description: string;
}

interface UserMetadata {
  basicInfo: BasicInfo;
  education: Education[];
  workExperience: WorkExperience[];
  skills: string[];
  certifications: string[];
  languages: string[];
}

interface TargetRole {
  title: string;
  description?: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
}

const TEMPLATES: Template[] = [
  {
    id: "clean",
    name: "Clean",
    description: "Minimalist design with clean lines",
    preview: "📄",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary layout with bold headers",
    preview: "🎨",
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated design with classic typography",
    preview: "✨",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Unique layout for creative professionals",
    preview: "🎭",
  },
  {
    id: "tech",
    name: "Tech",
    description: "Developer-focused with technical sections",
    preview: "💻",
  },
];

const SUGGESTED_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "Git",
  "Docker",
  "AWS",
  "MongoDB",
  "PostgreSQL",
  "Express.js",
  "Angular",
  "Vue.js",
];

interface Question {
  id: string;
  type: 'text' | 'email' | 'url' | 'education' | 'work' | 'skills';
  question: string;
  placeholder?: string;
  required?: boolean;
}

const METADATA_QUESTIONS: Question[] = [
  {
    id: 'name',
    type: 'text',
    question: "What's your full name?",
    placeholder: "John Doe",
    required: true
  },
  {
    id: 'email',
    type: 'email',
    question: "What's your email address?",
    placeholder: "john@example.com",
    required: true
  },
  {
    id: 'linkedin',
    type: 'url',
    question: "What's your LinkedIn profile URL? (Optional)",
    placeholder: "https://linkedin.com/in/johndoe"
  },
  {
    id: 'education',
    type: 'education',
    question: "Tell us about your education",
    placeholder: "Add your degrees, schools, and graduation years"
  },
  {
    id: 'work',
    type: 'work',
    question: "What's your work experience?",
    placeholder: "Add your job titles, companies, and descriptions"
  },
  {
    id: 'skills',
    type: 'skills',
    question: "What are your key skills?",
    placeholder: "Select from popular skills or add your own"
  }
];

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userMetadata, setUserMetadata] = useState<UserMetadata>({
    basicInfo: { name: "", email: "", linkedin: "" },
    education: [],
    workExperience: [],
    skills: [],
    certifications: [],
    languages: [],
  });
  const [targetRole, setTargetRole] = useState<TargetRole>({ title: "" });
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [currentSkillInput, setCurrentSkillInput] = useState("");

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      graduationYear: "",
    };
    setUserMetadata((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setUserMetadata((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setUserMetadata((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addWorkExperience = () => {
    const newWork: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      duration: "",
      description: "",
    };
    setUserMetadata((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, newWork],
    }));
  };

  const updateWorkExperience = (
    id: string,
    field: keyof WorkExperience,
    value: string
  ) => {
    setUserMetadata((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((work) =>
        work.id === id ? { ...work, [field]: value } : work
      ),
    }));
  };

  const removeWorkExperience = (id: string) => {
    setUserMetadata((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((work) => work.id !== id),
    }));
  };

  const addSkill = (skill: string) => {
    if (!userMetadata.skills.includes(skill)) {
      setUserMetadata((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setUserMetadata((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const generateResume = () => {
    console.log("Generated Resume Data:");
    console.log("======================");
    console.log("User Metadata:", userMetadata);
    console.log("Target Role:", targetRole);
    console.log("Selected Template:", selectedTemplate);
    console.log("======================");
    alert(
      "Resume data logged to console! Check the browser console (F12) to see all collected data."
    );
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setCurrentQuestion(0); // Reset question counter when moving to next step
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setCurrentQuestion(0); // Reset question counter when moving to previous step
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < METADATA_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // If we're at the last question, move to next step
      nextStep();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleBasicInfoUpdate = (field: keyof BasicInfo, value: string) => {
    setUserMetadata((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, [field]: value },
    }));
  };

  const canProceedToNext = () => {
    const currentQ = METADATA_QUESTIONS[currentQuestion];
    if (currentQ.required) {
      switch (currentQ.id) {
        case 'name':
          return userMetadata.basicInfo.name.trim() !== '';
        case 'email':
          return userMetadata.basicInfo.email.trim() !== '';
        default:
          return true;
      }
    }
    return true;
  };

  return (
    <div className="resume-builder">
      {/* Header */}
      <header className="header">
        <h1>RoleReady</h1>
        <div className="progress-bar">
          <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
            <User size={20} />
            <span>User Info</span>
          </div>
          <ChevronRight size={16} className="arrow" />
          <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
            <Briefcase size={20} />
            <span>Target Role</span>
          </div>
          <ChevronRight size={16} className="arrow" />
          <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
            <Code size={20} />
            <span>Resume</span>
          </div>
        </div>
      </header>

      {/* Step 1: User Metadata Collection */}
      {currentStep === 1 && (
        <div className="step-content">
          <div className="question-progress">
            <div className="progress-bar-wrapper">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentQuestion + 1) / METADATA_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
            <span className="progress-text">
              Question {currentQuestion + 1} of {METADATA_QUESTIONS.length}
            </span>
          </div>

          <div className="question-container">
            <h2>{METADATA_QUESTIONS[currentQuestion].question}</h2>
            
            {/* Basic Info Questions */}
            {METADATA_QUESTIONS[currentQuestion].id === 'name' && (
              <div className="answer-section">
                <input
                  type="text"
                  value={userMetadata.basicInfo.name}
                  onChange={(e) => handleBasicInfoUpdate('name', e.target.value)}
                  placeholder={METADATA_QUESTIONS[currentQuestion].placeholder}
                  className="question-input"
                  autoFocus
                />
              </div>
            )}

            {METADATA_QUESTIONS[currentQuestion].id === 'email' && (
              <div className="answer-section">
                <input
                  type="email"
                  value={userMetadata.basicInfo.email}
                  onChange={(e) => handleBasicInfoUpdate('email', e.target.value)}
                  placeholder={METADATA_QUESTIONS[currentQuestion].placeholder}
                  className="question-input"
                  autoFocus
                />
              </div>
            )}

            {METADATA_QUESTIONS[currentQuestion].id === 'linkedin' && (
              <div className="answer-section">
                <input
                  type="url"
                  value={userMetadata.basicInfo.linkedin}
                  onChange={(e) => handleBasicInfoUpdate('linkedin', e.target.value)}
                  placeholder={METADATA_QUESTIONS[currentQuestion].placeholder}
                  className="question-input"
                  autoFocus
                />
              </div>
            )}

            {/* Education Question */}
            {METADATA_QUESTIONS[currentQuestion].id === 'education' && (
              <div className="answer-section">
                <div className="dynamic-list">
                  {userMetadata.education.map((edu) => (
                    <div key={edu.id} className="list-item">
                      <div className="form-row">
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                          placeholder="Degree (e.g., Bachelor of Science)"
                          className="form-input"
                        />
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                          placeholder="School/University"
                          className="form-input"
                        />
                        <input
                          type="text"
                          value={edu.graduationYear}
                          onChange={(e) => updateEducation(edu.id, "graduationYear", e.target.value)}
                          placeholder="Year"
                          className="form-input"
                        />
                      </div>
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button onClick={addEducation} className="add-btn">
                    + Add Education
                  </button>
                </div>
              </div>
            )}

            {/* Work Experience Question */}
            {METADATA_QUESTIONS[currentQuestion].id === 'work' && (
              <div className="answer-section">
                <div className="dynamic-list">
                  {userMetadata.workExperience.map((work) => (
                    <div key={work.id} className="list-item">
                      <div className="form-row">
                        <input
                          type="text"
                          value={work.jobTitle}
                          onChange={(e) => updateWorkExperience(work.id, "jobTitle", e.target.value)}
                          placeholder="Job Title"
                          className="form-input"
                        />
                        <input
                          type="text"
                          value={work.company}
                          onChange={(e) => updateWorkExperience(work.id, "company", e.target.value)}
                          placeholder="Company"
                          className="form-input"
                        />
                        <input
                          type="text"
                          value={work.duration}
                          onChange={(e) => updateWorkExperience(work.id, "duration", e.target.value)}
                          placeholder="Duration (e.g., Jan 2022 - Present)"
                          className="form-input"
                        />
                      </div>
                      <textarea
                        value={work.description}
                        onChange={(e) => updateWorkExperience(work.id, "description", e.target.value)}
                        placeholder="Describe your responsibilities and achievements..."
                        className="form-textarea"
                        rows={3}
                      />
                      <button
                        onClick={() => removeWorkExperience(work.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button onClick={addWorkExperience} className="add-btn">
                    + Add Work Experience
                  </button>
                </div>
              </div>
            )}

            {/* Skills Question */}
            {METADATA_QUESTIONS[currentQuestion].id === 'skills' && (
              <div className="answer-section">
                <div className="skills-question">
                  <div className="suggested-skills">
                    <p>Popular skills:</p>
                    <div className="skills-grid">
                      {SUGGESTED_SKILLS.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => addSkill(skill)}
                          className={`skill-tag ${
                            userMetadata.skills.includes(skill) ? "selected" : ""
                          }`}
                        >
                          {skill}
                          {userMetadata.skills.includes(skill) && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="custom-skill-input">
                    <input
                      type="text"
                      value={currentSkillInput}
                      onChange={(e) => setCurrentSkillInput(e.target.value)}
                      placeholder="Add custom skill..."
                      className="question-input"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && currentSkillInput.trim()) {
                          addSkill(currentSkillInput.trim());
                          setCurrentSkillInput("");
                        }
                      }}
                    />
                    {currentSkillInput.trim() && (
                      <button
                        onClick={() => {
                          addSkill(currentSkillInput.trim());
                          setCurrentSkillInput("");
                        }}
                        className="add-skill-btn"
                      >
                        Add
                      </button>
                    )}
                  </div>

                  {userMetadata.skills.length > 0 && (
                    <div className="selected-skills">
                      <p>Your skills:</p>
                      <div className="skills-grid">
                        {userMetadata.skills.map((skill) => (
                          <button
                            key={skill}
                            onClick={() => removeSkill(skill)}
                            className="skill-tag selected"
                          >
                            {skill} ×
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="question-actions">
              {currentQuestion > 0 && (
                <button onClick={prevQuestion} className="prev-btn">
                  Previous
                </button>
              )}
              <button 
                onClick={nextQuestion} 
                className="next-btn"
                disabled={!canProceedToNext()}
              >
                {currentQuestion === METADATA_QUESTIONS.length - 1 ? "Complete Profile" : "Next"}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Role Targeting */}
      {currentStep === 2 && (
        <div className="step-content">
          <h2>🎯 What role are you targeting?</h2>

          <div className="card">
            <div className="card-header">
              <Briefcase size={20} />
              <h3>Target Role</h3>
            </div>
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                value={targetRole.title}
                onChange={(e) =>
                  setTargetRole((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g., Frontend Developer, Data Scientist, Product Manager"
              />
            </div>
            <div className="form-group">
              <label>Additional Details (Optional)</label>
              <textarea
                value={targetRole.description || ""}
                onChange={(e) =>
                  setTargetRole((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Any specific requirements or preferences for this role..."
                rows={3}
              />
            </div>
          </div>

          <div className="role-suggestions">
            <h3>💡 Popular Roles</h3>
            <div className="role-cards">
              {[
                "Frontend Developer",
                "Backend Developer",
                "Full Stack Developer",
                "Data Scientist",
                "Product Manager",
                "UX Designer",
              ].map((role) => (
                <button
                  key={role}
                  onClick={() => setTargetRole({ title: role })}
                  className={`role-card ${
                    targetRole.title === role ? "selected" : ""
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="step-actions">
            <button onClick={prevStep} className="prev-btn">
              Previous
            </button>
            <button onClick={nextStep} className="next-btn">
              Next Step <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Resume & Template Selection */}
      {currentStep === 3 && (
        <div className="step-content">
          <h2>📄 Choose your template</h2>

          <div className="resume-layout">
            <div className="template-selection">
              <h3>Templates</h3>
              <div className="templates-grid">
                {TEMPLATES.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`template-card ${
                      selectedTemplate === template.id ? "selected" : ""
                    }`}
                  >
                    <div className="template-preview">{template.preview}</div>
                    <h4>{template.name}</h4>
                    <p>{template.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="resume-preview">
              <h3>Preview</h3>
              <div className="preview-card">
                <div className="preview-header">
                  <h4>{userMetadata.basicInfo.name || "Your Name"}</h4>
                  <p>{userMetadata.basicInfo.email}</p>
                  <p>{targetRole.title || "Target Role"}</p>
                </div>
                <div className="preview-section">
                  <strong>Skills:</strong>
                  <p>{userMetadata.skills.join(", ") || "No skills added"}</p>
                </div>
                <div className="preview-section">
                  <strong>Experience:</strong>
                  <p>{userMetadata.workExperience.length} position(s)</p>
                </div>
                <div className="preview-section">
                  <strong>Education:</strong>
                  <p>{userMetadata.education.length} degree(s)</p>
                </div>
                <div className="preview-section">
                  <strong>Template:</strong>
                  <p>
                    {selectedTemplate
                      ? TEMPLATES.find((t) => t.id === selectedTemplate)?.name
                      : "No template selected"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="step-actions">
            <button onClick={prevStep} className="prev-btn">
              Previous
            </button>
            <button onClick={generateResume} className="generate-btn">
              Generate Resume 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
