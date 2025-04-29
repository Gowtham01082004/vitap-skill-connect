// CreatePost.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Chip,
  Grid,
  Divider,
} from "@mui/material";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css"; // custom styles

const steps = ["Project Details", "Requirements", "Team Composition", "Review"];
const predefinedSkills = [
  "Python",
  "Machine Learning",
  "React",
  "Cloud",
  "Data Analytics",
  "TensorFlow",
];
const predefinedDomains = [
  "Web Development",
  "Mobile Development",
  "AI/ML",
  "Cloud Computing",
  "Cybersecurity",
  "Blockchain",
];

const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [customSkill, setCustomSkill] = useState("");
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    projectType: "Research Project",
    duration: "3 months",
    domain: [],
    fullDescription: "",
    skillsRequired: [],
    technicalKnowledge: "",
    teamSize: 0,
    roles: [],
    deadline: "",
  });

  useEffect(() => {
    if (!user) return;
    const fetchUser = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) setUserData(snap.data());
    };
    fetchUser();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (skill) => {
    if (!formData.skillsRequired.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, skill],
      }));
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter((s) => s !== skill),
    }));
  };

  const handleRolesCountChange = (e) => {
    const numRoles = parseInt(e.target.value) || 0;
    const updatedRoles = Array.from({ length: numRoles }, (_, i) => ({
      title: formData.roles[i]?.title || "",
      skills: formData.roles[i]?.skills || [],
      count: formData.roles[i]?.count || 1,
    }));
    const updatedTeamSize = updatedRoles.reduce(
      (sum, r) => sum + (parseInt(r.count) || 0),
      0
    );
    setFormData((prev) => ({
      ...prev,
      roles: updatedRoles,
      teamSize: updatedTeamSize,
    }));
  };

  const handleRoleChange = (i, field, value) => {
    const updatedRoles = [...formData.roles];
    updatedRoles[i][field] = value;
    const updatedTeamSize = updatedRoles.reduce(
      (sum, r) => sum + (parseInt(r.count) || 0),
      0
    );
    setFormData((prev) => ({
      ...prev,
      roles: updatedRoles,
      teamSize: updatedTeamSize,
    }));
  };

  const handleNext = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.projectType ||
      !formData.duration ||
      !formData.domain.length ||
      !formData.fullDescription ||
      !formData.skillsRequired.length ||
      !formData.technicalKnowledge ||
      !formData.roles.length ||
      formData.roles.some(
        (r) => !r.title || !r.skills.length || !r.count || r.count < 1
      )
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const cleanedRoles = formData.roles.map(({ title, skills, count }) => ({
        title,
        skills,
        count,
      }));
      const postData = {
        ...formData,
        roles: cleanedRoles,
        userId: user.uid,
        userEmail: user.email,
        userName: userData?.name || "Unknown",
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(db, "posts"), postData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              label="Project Title"
              name="title"
              fullWidth
              margin="normal"
              required
              value={formData.title}
              onChange={handleChange}
              className="custom-input"
            />
            <Box display="flex" gap={2}>
              <TextField
                select
                name="projectType"
                label="Project Type"
                fullWidth
                margin="normal"
                required
                value={formData.projectType}
                onChange={handleChange}
                className="custom-input"
              >
                <MenuItem value="Research Project">Research</MenuItem>
                <MenuItem value="Software Development">Software</MenuItem>
                <MenuItem value="Design Project">Design</MenuItem>
              </TextField>
              <TextField
                select
                name="duration"
                label="Duration"
                fullWidth
                margin="normal"
                required
                value={formData.duration}
                onChange={handleChange}
                className="custom-input"
              >
                <MenuItem value="1 month">1 month</MenuItem>
                <MenuItem value="3 months">3 months</MenuItem>
                <MenuItem value="6 months">6 months</MenuItem>
              </TextField>
            </Box>
            <TextField
              select
              fullWidth
              required
              margin="normal"
              label="Domain(s)"
              name="domain"
              className="custom-input"
              SelectProps={{
                multiple: true,
                value: formData.domain,
                onChange: (e) =>
                  setFormData((prev) => ({ ...prev, domain: e.target.value })),
                renderValue: (selected) => selected.join(", "),
              }}
            >
              {predefinedDomains.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Project Description"
              name="fullDescription"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              required
              value={formData.fullDescription}
              onChange={handleChange}
              className="custom-input"
            />
          </>
        );
      case 1:
        return (
          <>
            <Typography mt={2}>Skills Required</Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {formData.skillsRequired.map((s, i) => (
                <Chip
                  key={i}
                  label={s}
                  onDelete={() => handleRemoveSkill(s)}
                  color="primary"
                  className="custom-chip"
                />
              ))}
            </Box>
            <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
              {predefinedSkills.map((s, i) => (
                <Chip
                  key={i}
                  label={s}
                  variant="outlined"
                  onClick={() => handleAddSkill(s)}
                  className="custom-chip"
                />
              ))}
            </Box>
            <Box display="flex" gap={2} mt={2}>
              <TextField
                value={customSkill}
                fullWidth
                placeholder="Custom Skill"
                onChange={(e) => setCustomSkill(e.target.value)}
                className="custom-input"
              />
              <Button
                variant="contained"
                disabled={!customSkill.trim()}
                onClick={() => {
                  handleAddSkill(customSkill.trim());
                  setCustomSkill("");
                }}
              >
                Add
              </Button>
            </Box>
            <TextField
              label="Technical Knowledge"
              name="technicalKnowledge"
              multiline
              rows={3}
              fullWidth
              margin="normal"
              required
              value={formData.technicalKnowledge}
              onChange={handleChange}
              className="custom-input"
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField
              label="Number of Roles"
              type="number"
              fullWidth
              required
              margin="normal"
              value={formData.roles.length}
              onChange={handleRolesCountChange}
              className="custom-input"
            />
            <Grid container spacing={2}>
              {formData.roles.map((role, i) => (
                <React.Fragment key={i}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label={`Role ${i + 1} Title`}
                      fullWidth
                      required
                      value={role.title}
                      onChange={(e) =>
                        handleRoleChange(i, "title", e.target.value)
                      }
                      className="custom-input"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Skills (comma separated)"
                      fullWidth
                      required
                      value={role.skills.join(", ")}
                      onChange={(e) =>
                        handleRoleChange(
                          i,
                          "skills",
                          e.target.value.split(",").map((s) => s.trim())
                        )
                      }
                      className="custom-input"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Members for this Role"
                      type="number"
                      fullWidth
                      required
                      value={role.count}
                      onChange={(e) =>
                        handleRoleChange(
                          i,
                          "count",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="custom-input"
                    />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
            <Typography mt={2}>
              <strong>Total Team Members:</strong> {formData.teamSize}
            </Typography>
          </>
        );
      case 3:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Review Your Project Details
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>
              <strong>Title:</strong> {formData.title}
            </Typography>
            <Typography>
              <strong>Type:</strong> {formData.projectType}
            </Typography>
            <Typography>
              <strong>Duration:</strong> {formData.duration}
            </Typography>
            <Typography>
              <strong>Domain(s):</strong> {formData.domain.join(", ")}
            </Typography>
            <Typography>
              <strong>Description:</strong> {formData.fullDescription}
            </Typography>
            <Typography>
              <strong className="temp">Skills:</strong>{" "}
              {formData.skillsRequired.join(", ")}
            </Typography>
            <Typography>
              <strong>Technical Knowledge:</strong>{" "}
              {formData.technicalKnowledge}
            </Typography>
            <Typography>
              <strong>Total Team Members:</strong> {formData.teamSize}
            </Typography>
            <Typography>
              <strong>Roles:</strong>
            </Typography>
            <ul>
              {formData.roles.map((r, i) => (
                <li key={i}>
                  <strong>{r.title}</strong> ({r.count}) - {r.skills.join(", ")}
                </li>
              ))}
            </ul>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box className="create-post-container">
      <Typography variant="h4" mb={2}>
        Create Project
      </Typography>
      <Paper className="create-post-paper">
        <Stepper activeStep={step} alternativeLabel className="stepper">
          {steps.map((label, i) => (
            <Step key={i}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box className="create-post-step-content">
          {renderStep()}
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button disabled={step === 0} onClick={handleBack}>
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreatePost;
