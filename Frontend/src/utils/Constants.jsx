export const SEVERITY_LEVELS = {
  CRITICAL: "Critical",
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

export const INCIDENT_STATUS = {
  ACTIVE: "Active",
  IN_PROGRESS: "In Progress",
  PENDING: "Pending",
  RESOLVED: "Resolved",
};

export const COLOR_SCHEME = {
  severity: {
    Critical: "red",
    High: "orange",
    Medium: "yellow",
    Low: "green",
  },
  status: {
    Active: "red",
    "In Progress": "orange",
    Pending: "yellow",
    Resolved: "green",
  },
};

export const INCIDENT_TYPES = {
  "Traffic Accident": "AlertCircle",
  Fire: "Flame",
  "Medical Emergency": "Ambulance",
  "Road Closure": "AlertTriangle",
  "Civil Disturbance": "AlertOctagon",
};
