"use client";

import { useState, useRef, useEffect } from "react";
import { Download, Eye, EyeOff, Settings, Layout, Target, X, Plus, CalendarIcon } from "lucide-react";
import { toPng } from "html-to-image";

interface Section {
  id: string;
  title: string;
  visible: boolean;
  content: any;
  styles?: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
  };
}

interface StatusCard {
  id: string;
  title: string;
  color: string;
  description: string;
}

interface StatusItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  nextStep: string;
  status: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  imageUrl?: string;
  bgColor: string;
}

interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDates: number[];
  onDateSelect: (date: number) => void;
  month: string;
  year: number;
}

type WeeklyPlanDraft = {
  id: string;
  name: string;
  createdAt: number;
  emailData: typeof defaultEmailData;
  sections: typeof defaultSections;
};
// Calendar date picker component
function DatePicker({ isOpen, onClose, selectedDates, onDateSelect, month, year }: DatePickerProps) {
  if (!isOpen) return null;

  const monthIndex = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].indexOf(month);

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDay = new Date(year, monthIndex, 1).getDay();

  // Create array of days
  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isSelected = selectedDates.includes(day);

    days.push(
      <div
        key={day}
        onClick={() => onDateSelect(day)}
        className={`w-8 h-8 flex items-center justify-center text-sm rounded-full cursor-pointer 
          ${isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-4 w-72">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Select Dates</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-4 text-center font-medium">
          {month} {year}
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">{days}</div>

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

const defaultEmailData = {
  title: "Weekly Plan",
  dateRange: "Week of May 3 – May 7",
  company: "CODIMITE",
  headerBgImage: "https://res.cloudinary.com/diii9yu7r/image/upload/v1748259697/Hero-BG-5_ltg44g.png",
  logo: "https://res.cloudinary.com/diii9yu7r/image/upload/v1748927826/codimite_logo_awsda5.png",
  overlayBgColor: "#191919",
  titleColor: "#ffffff",
  dateRangeColor: "#ffffff",
};

const defaultSections = [
  {
    id: "glance",
    title: "This Week at a Glance",
    visible: true,
    content: {
      heading: "THIS WEEK AT A GLANCE",
      text: "Here’s a comprehensive summary of the project’s progress and upcoming steps.",
      stickyNotesImage:
        "https://res.cloudinary.com/diii9yu7r/image/upload/v1748326135/calendar-planner-organization-management-remind-concept_1_1_vamgkx.png",
      titleTop: "",
      titleBottom: "",
    },
    styles: {
      backgroundColor: "#EBF8FF",
      textColor: "#1E40AF",
    },
  },
  {
    id: "summary",
    title: "Executive Summary",
    visible: true,
    content: {
      statusCards: [
        { id: "1", title: "Overall project", color: "green", description: "mainly on-track" },
        { id: "2", title: "Timeline", color: "yellow", description: "on-schedule" },
        { id: "3", title: "Issues/Risks", color: "red", description: "no issues" },
      ],
      text: "The project is progressing steadily, with major deliverables on track and minimal risks identified. ",
      titleTop: "Executive",
      titleBottom: "Summary",
      statusItems: [
        {
          id: "1",
          icon: "check",
          title: "User Data Migration Successfully Completed and System Fully Validated",
          description: "Successfully migrated user data to new infrastructure",
          nextStep: "Monitor performance metrics",
          status: "completed",
        },
        {
          id: "2",
          icon: "clock",
          title: "Ongoing Quality Assurance and Regression Testing Across Modules",
          description: "Quality assurance testing in progress",
          nextStep: "Complete regression testing",
          status: "progress",
        },
        {
          id: "3",
          icon: "warning",
          title: "Third-Party API is Experiencing Ongoing Instability Issues",
          description: "Third-party API experiencing intermittent issues",
          nextStep: "Contact vendor support",
          status: "blocked",
        },
      ],
      nextItems: [
        {
          id: "1",
          icon: "check",
          title: "Final Phase of Data Migration Completed with Full Validation Checks",
          description: "Successfully migrated user data to new infrastructure",
          nextStep: "Monitor performance metrics",
          status: "completed",
        },
        {
          id: "2",
          icon: "clock",
          title: "Finalization of Testing Procedures and QA Sign-off Pending",
          description: "Quality assurance testing in progress",
          nextStep: "Complete regression testing",
          status: "progress",
        },
        {
          id: "3",
          icon: "warning",
          title: "External Vendor Support Required to Resolve API Communication Errors",
          description: "Third-party API experiencing intermittent issues",
          nextStep: "Contact vendor support",
          status: "blocked",
        },
      ],
    },
  },
  {
    id: "updates",
    title: "Important Updates",
    visible: true,
    content: {
      text: "Below are the latest updates across key workstreams, including current progress, project status, and associated priorities.",
      titleTop: "Important",
      titleBottom: "Updates",
      projects: [
        {
          id: "1",
          title: "Frontend Redesign Rollout",
          description:
            "The team is actively working on implementing the updated UI based on the finalized Figma designs. Key components have been migrated to the new design system, and mobile responsiveness is currently being optimized.",
          status: "In Progress",
          priority: "High",
          imageUrl: "https://res.cloudinary.com/diii9yu7r/image/upload/v1748361545/image_18_ue0drs.png",
          bgColor: "blue",
        },
        {
          id: "2",
          title: "Backend API Stabilization",
          description:
            "The backend team has completed integration testing for critical endpoints. Remaining work includes load testing and documentation for partner APIs to ensure performance benchmarks are met before deployment.",
          status: "Review",
          priority: "Medium",
          imageUrl: "https://res.cloudinary.com/diii9yu7r/image/upload/v1748361545/image_18_ue0drs.png",
          bgColor: "green",
        },
        {
          id: "3",
          title: "Security & Compliance Review",
          description:
            "Our security team has completed the first round of internal audits and compliance checks. Current focus is on resolving flagged issues and preparing necessary reports for the upcoming third-party review.",
          status: "Review",
          priority: "Medium",
          imageUrl: "https://res.cloudinary.com/diii9yu7r/image/upload/v1748361545/image_18_ue0drs.png",
          bgColor: "orange",
        },
      ],
    },
  },
  {
    id: "milestones",
    title: "Planned Tasks & Milestone",
    visible: true,
    content: {
      subtitle: "Upcoming deliverables and key milestones for the week",
      backgroundImage: "/placeholder.svg?height=200&width=800",
      backgroundImage2: "/placeholder.svg?height=200&width=800",
      useCustomImage: false,
      overlayText: "Milestone Timeline Placeholder",
      titleTop: "Planned Tasks &",
      titleBottom: "Milestone",
      showImage1: true,
      showImage2: true,
    },
    styles: {
      backgroundColor: "#F3F4F6",
      textColor: "#6B7280",
    },
  },
  {
    id: "addedsection",
    title: "Additional Section",
    visible: true,
    content: {
      subtitle: "Upcoming deliverables and key milestones for the week",
      backgroundImage: "/placeholder.svg?height=200&width=800",
      backgroundImage2: "/placeholder.svg?height=200&width=800",
      useCustomImage: false,
      overlayText: "Milestone Timeline Placeholder",
      titleTop: "Additional",
      titleBottom: "Section",
    },
    styles: {
      backgroundColor: "#F3F4F6",
      textColor: "#6B7280",
    },
  },
  {
    id: "schedule",
    title: "Time-Off Schedule",
    visible: true,
    content: {
      titleTop: "Time-Off",
      titleBottom: "Schedule",
      subtitle: "Team availability and scheduled time off",
      backgroundImage: "/placeholder.svg?height=200&width=800",
      useCustomImage: false,
      overlayText: "Schedule Grid Placeholder",
      month: "June",
      year: 2025,
      selectedDates: [10],
      companyHolidays: [15, 25],
      nationalHolidays: [10, 20],
      useCalendarView: true,
    },
    styles: {
      backgroundColor: "#F3F4F6",
      textColor: "#6B7280",
    },
  },
  {
    id: "overview",
    title: "Segmented Overview of Updates",

    visible: true,
    content: {
      subtitle:
        "Stay informed with categorized updates across major customer, support, and product development areas. ",
      titleTop: "Segmented Overview of",
      titleBottom: "Updates",
      buttons: ["New Customer Onboarding Updates", "Customer Issue Resolution Updates", "Development Request Updates"],
    },
    styles: {
      backgroundColor: "#0084EE",
      textColor: "#FFFFFF",
    },
  },
  {
    id: "Additional",
    title: "Additional Resources",

    visible: true,
    content: {
      buttons: ["New Customer Onboarding Updates", "Customer Issue Resolution Updates"],
      titleTop: "",
      titleBottom: "",
    },
    styles: {
      backgroundColor: "#0084EE",
      textColor: "#FFFFFF",
    },
  },
];

function loadDrafts(): WeeklyPlanDraft[] {
  const str = localStorage.getItem("weeklyPlanDrafts");
  return str ? JSON.parse(str) : [];
}
function saveDrafts(drafts: WeeklyPlanDraft[]) {
  localStorage.setItem("weeklyPlanDrafts", JSON.stringify(drafts));
}

export default function WeeklyPlanBuilder() {
  const [emailData, setEmailData] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("weeklyPlanEmailData");
      return stored ? JSON.parse(stored) : defaultEmailData;
    }
    return defaultEmailData;
  });

  const [sections, setSections] = useState((): any => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("weeklyPlanSections");
      return stored ? JSON.parse(stored) : defaultSections;
    }
    return defaultSections;
  });

  const [drafts, setDrafts] = useState<WeeklyPlanDraft[]>([]);

  // Load drafts on mount
  useEffect(() => {
    setDrafts(loadDrafts());
  }, []);

  // Save a new draft
  const handleSaveDraft = () => {
    const name = prompt("Draft name?");
    if (!name) return;
    const newDraft: WeeklyPlanDraft = {
      id: `${Date.now()}`,
      name,
      createdAt: Date.now(),
      emailData,
      sections,
    };
    const updatedDrafts = [newDraft, ...drafts];
    setDrafts(updatedDrafts);
    saveDrafts(updatedDrafts);
    alert("Draft saved!");
  };

  // Load a draft
  const handleLoadDraft = (draft: WeeklyPlanDraft) => {
    if (window.confirm(`Load draft "${draft.name}"? Unsaved changes will be lost.`)) {
      setEmailData(draft.emailData);
      setSections(draft.sections);
    }
  };

  // Delete a draft
  const handleDeleteDraft = (id: string) => {
    const updatedDrafts = drafts.filter((d) => d.id !== id);
    setDrafts(updatedDrafts);
    saveDrafts(updatedDrafts);
  };

  // Save current state to localStorage on changes
  useEffect(() => {
    localStorage.setItem("weeklyPlanEmailData", JSON.stringify(emailData));
  }, [emailData]);
  useEffect(() => {
    localStorage.setItem("weeklyPlanSections", JSON.stringify(sections));
  }, [sections]);

  // useEffect(() => {
  //   localStorage.setItem("weeklyPlanEmailData", JSON.stringify(emailData));
  // }, [emailData]);
  // useEffect(() => {
  //   localStorage.setItem("weeklyPlanSections", JSON.stringify(sections));
  // }, [sections]);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to reset all data?")) {
      localStorage.removeItem("weeklyPlanEmailData");
      localStorage.removeItem("weeklyPlanSections");
      setEmailData(defaultEmailData);
      setSections(defaultSections);
    }
  };

  // State for date picker
  const [datePickerState, setDatePickerState] = useState({
    isOpen: false,
    holidayType: "" as "company" | "national" | "",
  });

  // Add state for dropdown
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const previewRef = useRef<HTMLDivElement>(null);

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section: any) => (section.id === sectionId ? { ...section, visible: !section.visible } : section))
    );
  };

  const updateSectionContent = (sectionId: string, field: string, value: any) => {
    setSections(
      sections.map((section: any) =>
        section.id === sectionId ? { ...section, content: { ...section.content, [field]: value } } : section
      )
    );
  };

  const updateSectionStyles = (sectionId: string, styles: any) => {
    setSections(
      sections.map((section: any) =>
        section.id === sectionId ? { ...section, styles: { ...section.styles, ...styles } } : section
      )
    );
  };

  const addStatusCard = (sectionId: string) => {
    const newCard = {
      id: Date.now().toString(),
      title: "New Status",
      color: "blue",
      description: "New status description",
    };
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      updateSectionContent(sectionId, "statusCards", [...section.content.statusCards, newCard]);
    }
  };

  const updateStatusCard = (sectionId: string, cardId: string, field: string, value: string) => {
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      const updatedCards = section.content.statusCards.map((card: StatusCard) =>
        card.id === cardId ? { ...card, [field]: value } : card
      );
      updateSectionContent(sectionId, "statusCards", updatedCards);
    }
  };

  const removeStatusCard = (sectionId: string, cardId: string) => {
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      const updatedCards = section.content.statusCards.filter((card: StatusCard) => card.id !== cardId);
      updateSectionContent(sectionId, "statusCards", updatedCards);
    }
  };

  const addStatusItem = (sectionId: string) => {
    const newItem = {
      id: Date.now().toString(),
      icon: "check",
      title: "New Task",
      description: "Task description",
      nextStep: "Next step",
      status: "progress",
    };
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      updateSectionContent(sectionId, "statusItems", [...section.content.statusItems, newItem]);
    }
  };

  const updateStatusItem = (sectionId: string, itemId: string, field: string, value: string) => {
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      const updatedItems = section.content.statusItems.map((item: StatusItem) =>
        item.id === itemId ? { ...item, [field]: value } : item
      );
      updateSectionContent(sectionId, "statusItems", updatedItems);
    }
  };

  const removeStatusItem = (sectionId: string, itemId: string) => {
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      const updatedItems = section.content.statusItems.filter((item: StatusItem) => item.id !== itemId);
      updateSectionContent(sectionId, "statusItems", updatedItems);
    }
  };

  const addNextItem = (sectionId: string) => {
    const newItem = {
      id: Date.now().toString(),
      icon: "check",
      title: "New Task",
      description: "Task description",
      nextStep: "Next step",
      status: "progress",
    };
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      updateSectionContent(sectionId, "nextItems", [...section.content.nextItems, newItem]);
    }
  };

  const updateNextItem = (sectionId: string, itemId: string, field: string, value: string) => {
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      const updatedItems = section.content.nextItems.map((item: StatusItem) =>
        item.id === itemId ? { ...item, [field]: value } : item
      );
      updateSectionContent(sectionId, "nextItems", updatedItems);
    }
  };

  const removeNextItem = (sectionId: string, itemId: string) => {
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      const updatedItems = section.content.nextItems.filter((item: StatusItem) => item.id !== itemId);
      updateSectionContent(sectionId, "nextItems", updatedItems);
    }
  };

  const addProject = (sectionId: string) => {
    const newProject = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Project description",
      status: "In Progress",
      priority: "Medium",
      imageUrl: "/placeholder.svg?height=80&width=120",
    };
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      updateSectionContent(sectionId, "projects", [...section.content.projects, newProject]);
    }
  };

  const updateProject = (sectionId: string, projectId: string, field: string, value: string) => {
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      const updatedProjects = section.content.projects.map((project: Project) =>
        project.id === projectId ? { ...project, [field]: value } : project
      );
      updateSectionContent(sectionId, "projects", updatedProjects);
    }
  };

  const removeProject = (sectionId: string, projectId: string) => {
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      const updatedProjects = section.content.projects.filter((project: Project) => project.id !== projectId);
      updateSectionContent(sectionId, "projects", updatedProjects);
    }
  };

  const addButton = (sectionId: string) => {
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      updateSectionContent(sectionId, "buttons", [...section.content.buttons, "New Button"]);
    }
  };

  const updateButton = (sectionId: string, index: number, value: string) => {
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      const updatedButtons = [...section.content.buttons];
      updatedButtons[index] = value;
      updateSectionContent(sectionId, "buttons", updatedButtons);
    }
  };

  const removeButton = (sectionId: string, index: number) => {
    const section = sections.find((s: any) => s.id === sectionId);
    if (section) {
      const updatedButtons = section.content.buttons.filter((_: string, i: number) => i !== index);
      updateSectionContent(sectionId, "buttons", updatedButtons);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <img
            src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748502548/weui_done2-filled_1_bueh2z.png"
            alt="Completed"
            className="w-[20px] h-[auto]"
          />
        );
      case "progress":
        return (
          <img
            src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748502548/Union_2_hu8dqh.png"
            alt="In Progress"
            className="w-[17px] h-[auto]"
          />
        );
      case "blocked":
        return (
          <img
            src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748503181/issuseicon_hggv4a.png"
            alt="In Progress"
            className="w-[17px] h-[auto]"
          />
        );
      default:
        return <Target className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusCardColor = (color: string) => {
    const colors = {
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      red: "bg-red-500",
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTextColor = (color: string) => {
    const colors = {
      green: "text-green-500",
      yellow: "text-yellow-500",
      red: "text-red-500",
      blue: "text-blue-500",
      purple: "text-purple-500",
      orange: "text-orange-500",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const getMonthName = (monthIndex: number) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex - 1];
  };

  const renderCalendar = (section: any) => {
    const monthIndex =
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].indexOf(section.content.month) + 1;

    const daysInMonth = getDaysInMonth(monthIndex, section.content.year);
    const firstDay = getFirstDayOfMonth(monthIndex, section.content.year);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCompanyHoliday = section.content.companyHolidays?.includes(day);
      const isNationalHoliday = section.content.nationalHolidays?.includes(day);

      let dayClass =
        "w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg cursor-pointer hover:bg-gray-100 transition-colors";

      if (isNationalHoliday) {
        dayClass += " bg-red-500 text-white";
      } else if (isCompanyHoliday) {
        dayClass += " bg-gray-800 text-white";
      } else {
        dayClass += " text-gray-700";
      }

      days.push(
        <div key={day} className={dayClass}>
          {day}
        </div>
      );
    }

    return days;
  };

  // Handle date selection in the date picker
  const handleDateSelect = (date: number) => {
    if (!datePickerState.holidayType || !datePickerState.isOpen) return;

    const scheduleSection = sections.find((s: any) => s.id === "schedule");
    if (!scheduleSection) return;

    const holidayType = datePickerState.holidayType;
    const currentHolidays = [...(scheduleSection.content[`${holidayType}Holidays`] || [])];

    // Toggle the date (add if not present, remove if present)
    const dateIndex = currentHolidays.indexOf(date);
    if (dateIndex === -1) {
      currentHolidays.push(date);
    } else {
      currentHolidays.splice(dateIndex, 1);
    }

    // Sort the dates for better display
    currentHolidays.sort((a, b) => a - b);

    updateSectionContent("schedule", `${holidayType}Holidays`, currentHolidays);
  };

  // Open date picker for specific holiday type
  const openDatePicker = (holidayType: "company" | "national") => {
    setDatePickerState({
      isOpen: true,
      holidayType,
    });
  };

  // Close date picker
  const closeDatePicker = () => {
    setDatePickerState({
      isOpen: false,
      holidayType: "",
    });
  };

  // Get selected dates based on current holiday type
  const getSelectedDates = () => {
    const scheduleSection = sections.find((s: any) => s.id === "schedule");
    if (!scheduleSection || !datePickerState.holidayType) return [];

    return scheduleSection.content[`${datePickerState.holidayType}Holidays`] || [];
  };

  // Format dates for display
  const formatDates = (dates: number[]) => {
    if (!dates || dates.length === 0) return "None selected";
    return dates.sort((a, b) => a - b).join(", ");
  };

  const downloadSectionAsImage = async (sectionId: string) => {
    const sectionElement = document.getElementById(`section-${sectionId}`);
    if (!sectionElement) return;

    try {
      sectionElement.classList.add("screenshot-mode");

      // Clean image styles (optional if you still face gray borders)
      sectionElement.querySelectorAll("img").forEach((img) => {
        img.style.border = "none";
        img.style.outline = "none";
        img.style.boxShadow = "none";
        img.style.background = "transparent";
      });

      const dataUrl = await toPng(sectionElement, {
        backgroundColor: "#ffffff",
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
        filter: (node: any) => {
          if (node instanceof HTMLElement) {
            node.style.outline = "none";
            node.style.boxShadow = "none";

            if (node.tagName === "IMG") {
              node.style.border = "none";
              node.style.outline = "none";
              node.style.boxShadow = "none";
              node.style.background = "transparent";
            }
          }
          return true;
        },
      });

      sectionElement.classList.remove("screenshot-mode");

      const link = document.createElement("a");
      const sectionName = sections.find((s: any) => s.id === sectionId)?.title || sectionId;
      link.download = `${sectionName.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("HTML to Image error:", error);
    }
  };

  // const downloadAllSections = async () => {
  //   const visibleSections = sections.filter((section: any) => section.visible);

  //   for (const section of visibleSections) {
  //     await downloadSectionAsImage(section.id);
  //     // Add a small delay between downloads to prevent browser issues
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //   }
  // };

  const downloadAllSections = async () => {
    // Download header first
    await downloadSectionAsImage("header");

    // Download all visible sections
    const visibleSections = sections.filter((section: any) => section.visible);
    for (const section of visibleSections) {
      await downloadSectionAsImage(section.id);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Download footer last (optional, if you want)
    await downloadSectionAsImage("footer");
  };

  // Add click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDownloadDropdownOpen(false);
      }
    };

    if (isDownloadDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDownloadDropdownOpen]);

  const handleAddCustomSection = () => {
    const newSectionId = `custom-section-${Date.now()}`;
    const newSection = {
      id: newSectionId,
      title: "Custom Section",
      visible: true,
      content: {
        titleTop: "Additional",
        titleBottom: "Section",
        subtitle: "Upcoming deliverables and key milestones for the week",
        overlayText: "Milestone Timeline Placeholder",
        useCustomImage: false,
        backgroundImage: "/placeholder.svg?height=200&width=800",
        backgroundImage2: "/placeholder.svg?height=200&width=800",
      },
      styles: {
        backgroundColor: "#F3F4F6",
        textColor: "#6B7280",
      },
    };
    setSections([...sections, newSection]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Weekly Plan Email Builder</h1>
          <p className="text-gray-600">Create and customize your professional weekly plan email</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Preview Section - Takes 3 columns */}

          {/* Controls Section - Takes 1 column */}
          <div className="xl:col-span-1 space-y-4 max-h-full overflow-y-auto">
            {/* Header Settings */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Header Settings
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={emailData.title}
                    onChange={(e) => setEmailData({ ...emailData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title Color</label>
                  <input
                    type="color"
                    value={emailData.titleColor}
                    onChange={(e) => setEmailData({ ...emailData, titleColor: e.target.value })}
                    className="w-12 h-8 border-0 bg-transparent"
                    title="Title Text Color"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
                  <input
                    type="text"
                    value={emailData.dateRange}
                    onChange={(e) => setEmailData({ ...emailData, dateRange: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Date Range Color</label>
                  <input
                    type="color"
                    value={emailData.dateRangeColor}
                    onChange={(e) => setEmailData({ ...emailData, dateRangeColor: e.target.value })}
                    className="w-12 h-8 border-0 bg-transparent"
                    title="Date Range Text Color"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Company Logo</label>
                  <input
                    type="text"
                    value={emailData.logo}
                    onChange={(e) => setEmailData({ ...emailData, logo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Logo URL"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Header Background Image URL</label>
                  <input
                    type="text"
                    value={emailData.headerBgImage}
                    onChange={(e) => setEmailData({ ...emailData, headerBgImage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Image URL"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Overlay Background Color</label>
                  <input
                    type="color"
                    value={emailData.overlayBgColor}
                    onChange={(e) => setEmailData({ ...emailData, overlayBgColor: e.target.value })}
                    className="w-12 h-8 border-0 bg-transparent"
                    title="Overlay Background Color"
                  />
                </div>
              </div>
            </div>

            {/* Section Controls */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Section Controls
              </h3>
              <div className="space-y-4">
                {sections.map((section: any) => (
                  <div key={section.id} className="border-b border-gray-200 rounded py-14 ">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base font-semibold text-gray-800 tracking-wide">{section.title}</span>
                      <button
                        onClick={() => toggleSection(section.id)}
                        className={`p-1 rounded ${
                          section.visible ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-50"
                        }`}
                      >
                        {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                    {section.visible && (
                      <div className="space-y-3">
                        {/* This Week at a Glance Controls */}
                        {section.id === "glance" && (
                          <>
                            <input
                              type="text"
                              value={section.content.heading}
                              onChange={(e) => updateSectionContent(section.id, "heading", e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              placeholder="Heading"
                            />
                            <textarea
                              value={section.content.text}
                              onChange={(e) => updateSectionContent(section.id, "text", e.target.value)}
                              rows={3}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              placeholder="Content text"
                            />
                            <input
                              type="text"
                              value={section.content.stickyNotesImage}
                              onChange={(e) => updateSectionContent(section.id, "stickyNotesImage", e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              placeholder="Sticky notes image URL"
                            />
                          </>
                        )}

                        {/* Executive Summary Controls */}
                        {section.id === "summary" && (
                          <>
                            <div className="space-y-2">
                              <input
                                value={section.content.titleTop}
                                onChange={(e) => updateSectionContent(section.id, "titleTop", e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                placeholder="Top Title Change Here"
                              />
                              <input
                                value={section.content.titleBottom}
                                onChange={(e) => updateSectionContent(section.id, "titleBottom", e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                placeholder="Bottom Title Change Here"
                              />
                              <textarea
                                value={section.content.text}
                                onChange={(e) => updateSectionContent(section.id, "text", e.target.value)}
                                rows={3}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                placeholder="Content text"
                              />
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-700">Status Cards</span>
                                <button
                                  onClick={() => addStatusCard(section.id)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              {section.content.statusCards.map((card: StatusCard) => (
                                <div key={card.id} className="border border-gray-200 rounded p-2 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <input
                                      type="text"
                                      value={card.title}
                                      onChange={(e) => updateStatusCard(section.id, card.id, "title", e.target.value)}
                                      className="flex-1 px-1 py-1 border border-gray-300 rounded text-xs"
                                    />
                                    <button
                                      onClick={() => removeStatusCard(section.id, card.id)}
                                      className="text-red-600 hover:text-red-700 ml-1"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <textarea
                                    value={card.description}
                                    onChange={(e) =>
                                      updateStatusCard(section.id, card.id, "description", e.target.value)
                                    }
                                    rows={2}
                                    className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                                  />
                                  <select
                                    value={card.color}
                                    onChange={(e) => updateStatusCard(section.id, card.id, "color", e.target.value)}
                                    className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                                  >
                                    <option value="green">Green</option>
                                    <option value="yellow">Yellow</option>
                                    <option value="red">Red</option>
                                    <option value="blue">Blue</option>
                                    <option value="purple">Purple</option>
                                    <option value="orange">Orange</option>
                                  </select>
                                </div>
                              ))}
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-700">Status Items</span>
                                <button
                                  onClick={() => addStatusItem(section.id)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              {section.content.statusItems.map((item: StatusItem) => (
                                <div key={item.id} className="border border-gray-200 rounded p-2 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <input
                                      type="text"
                                      value={item.title}
                                      onChange={(e) => updateStatusItem(section.id, item.id, "title", e.target.value)}
                                      className="flex-1 px-1 py-1 border border-gray-300 rounded text-xs"
                                    />
                                    <button
                                      onClick={() => removeStatusItem(section.id, item.id)}
                                      className="text-red-600 hover:text-red-700 ml-1"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>

                                  <select
                                    value={item.status}
                                    onChange={(e) => updateStatusItem(section.id, item.id, "status", e.target.value)}
                                    className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                                  >
                                    <option value="completed">Completed</option>
                                    <option value="progress">In Progress</option>
                                    <option value="blocked">Blocked</option>
                                  </select>
                                </div>
                              ))}
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-700">Next Items</span>
                                <button
                                  onClick={() => addNextItem(section.id)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              {section.content.nextItems.map((item: StatusItem) => (
                                <div key={item.id} className="border border-gray-200 rounded p-2 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <input
                                      type="text"
                                      value={item.title}
                                      onChange={(e) => updateNextItem(section.id, item.id, "title", e.target.value)}
                                      className="flex-1 px-1 py-1 border border-gray-300 rounded text-xs"
                                    />
                                    <button
                                      onClick={() => removeNextItem(section.id, item.id)}
                                      className="text-red-600 hover:text-red-700 ml-1"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        {/* Important Updates Controls */}
                        {section.id === "updates" && (
                          <div className="space-y-2">
                            <input
                              value={section.content.titleTop}
                              onChange={(e) => updateSectionContent(section.id, "titleTop", e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              placeholder="Top Title Change Here"
                            />
                            <input
                              value={section.content.titleBottom}
                              onChange={(e) => updateSectionContent(section.id, "titleBottom", e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              placeholder="Bottom Title Change Here"
                            />
                            <textarea
                              value={section.content.text}
                              onChange={(e) => updateSectionContent(section.id, "text", e.target.value)}
                              rows={3}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              placeholder="Content text"
                            />
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-gray-700">Projects</span>
                              <button
                                onClick={() => addProject(section.id)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            {section.content.projects.map((project: Project) => (
                              <div key={project.id} className="border border-gray-200 rounded p-2 space-y-1">
                                <div className="flex items-center justify-between">
                                  <input
                                    type="text"
                                    value={project.title}
                                    onChange={(e) => updateProject(section.id, project.id, "title", e.target.value)}
                                    className="flex-1 px-1 py-1 border border-gray-300 rounded text-xs"
                                  />
                                  <button
                                    onClick={() => removeProject(section.id, project.id)}
                                    className="text-red-600 hover:text-red-700 ml-1"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                                <textarea
                                  value={project.description}
                                  onChange={(e) => updateProject(section.id, project.id, "description", e.target.value)}
                                  rows={2}
                                  className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                                />
                                <input
                                  type="text"
                                  value={project.imageUrl}
                                  onChange={(e) => updateProject(section.id, project.id, "imageUrl", e.target.value)}
                                  className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                                  placeholder="Image URL"
                                />
                                <select
                                  value={project.bgColor}
                                  onChange={(e) => updateProject(section.id, project.id, "bgColor", e.target.value)}
                                  className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                                >
                                  <option value="green">Green</option>
                                  <option value="yellow">Yellow</option>
                                  <option value="red">Red</option>
                                  <option value="blue">Blue</option>
                                  <option value="purple">Purple</option>
                                  <option value="orange">Orange</option>
                                </select>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Milestones and Schedule Controls */}
                        {(section.id === "milestones" || section.id === "schedule") && (
                          <>
                            {section.id === "schedule" && (
                              <>
                                <input
                                  value={section.content.titleTop}
                                  onChange={(e) => updateSectionContent(section.id, "titleTop", e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                  placeholder="Top Title Change Here"
                                />
                                <input
                                  value={section.content.titleBottom}
                                  onChange={(e) => updateSectionContent(section.id, "titleBottom", e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                  placeholder="Bottom Title Change Here"
                                />
                                <textarea
                                  value={section.content.subtitle}
                                  onChange={(e) => updateSectionContent(section.id, "subtitle", e.target.value)}
                                  rows={2}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                  placeholder="Subtitle"
                                />
                                <div className="flex items-center gap-2 mb-3">
                                  <input
                                    type="checkbox"
                                    checked={section.content.useCalendarView}
                                    onChange={(e) =>
                                      updateSectionContent(section.id, "useCalendarView", e.target.checked)
                                    }
                                    className="w-3 h-3"
                                  />
                                  <span className="text-xs text-gray-700">Use calendar view</span>
                                </div>

                                {section.content.useCalendarView ? (
                                  // Calendar Controls
                                  <div className="space-y-2">
                                    <div className="flex gap-2">
                                      <select
                                        value={section.content.month}
                                        onChange={(e) => updateSectionContent(section.id, "month", e.target.value)}
                                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                                      >
                                        {[
                                          "January",
                                          "February",
                                          "March",
                                          "April",
                                          "May",
                                          "June",
                                          "July",
                                          "August",
                                          "September",
                                          "October",
                                          "November",
                                          "December",
                                        ].map((month) => (
                                          <option key={month} value={month}>
                                            {month}
                                          </option>
                                        ))}
                                      </select>
                                      <input
                                        type="number"
                                        value={section.content.year}
                                        onChange={(e) =>
                                          updateSectionContent(section.id, "year", Number.parseInt(e.target.value))
                                        }
                                        className="w-16 px-2 py-1 border border-gray-300 rounded text-xs"
                                        min="2020"
                                        max="2030"
                                      />
                                    </div>

                                    {/* Company Holidays */}
                                    <div>
                                      <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Company Holidays
                                      </label>
                                      <div className="flex items-center gap-2">
                                        <div className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs bg-gray-50">
                                          {formatDates(section.content.companyHolidays || [])}
                                        </div>
                                        <button
                                          onClick={() => openDatePicker("company")}
                                          className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                                          title="Select dates"
                                        >
                                          <CalendarIcon className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* National Holidays */}
                                    <div>
                                      <label className="block text-xs font-medium text-gray-700 mb-1">
                                        National Holidays
                                      </label>
                                      <div className="flex items-center gap-2">
                                        <div className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs bg-gray-50">
                                          {formatDates(section.content.nationalHolidays || [])}
                                        </div>
                                        <button
                                          onClick={() => openDatePicker("national")}
                                          className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                                          title="Select dates"
                                        >
                                          <CalendarIcon className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  // Original Controls
                                  <>
                                    <input
                                      type="text"
                                      value={section.content.overlayText}
                                      onChange={(e) => updateSectionContent(section.id, "overlayText", e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                      placeholder="Overlay text"
                                    />
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        checked={section.content.useCustomImage}
                                        onChange={(e) =>
                                          updateSectionContent(section.id, "useCustomImage", e.target.checked)
                                        }
                                        className="w-3 h-3"
                                      />
                                      <span className="text-xs text-gray-700">Use custom image</span>
                                    </div>
                                    {section.content.useCustomImage && (
                                      <input
                                        type="text"
                                        value={section.content.backgroundImage}
                                        onChange={(e) =>
                                          updateSectionContent(section.id, "backgroundImage", e.target.value)
                                        }
                                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                        placeholder="Background image URL"
                                      />
                                    )}
                                    {!section.content.useCustomImage && (
                                      <div className="flex gap-2">
                                        <input
                                          type="color"
                                          value={section.styles?.backgroundColor || "#F3F4F6"}
                                          onChange={(e) =>
                                            updateSectionStyles(section.id, { backgroundColor: e.target.value })
                                          }
                                          className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                                          title="Background Color"
                                        />
                                        <input
                                          type="color"
                                          value={section.styles?.textColor || "#6B7280"}
                                          onChange={(e) =>
                                            updateSectionStyles(section.id, { textColor: e.target.value })
                                          }
                                          className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                                          title="Text Color"
                                        />
                                      </div>
                                    )}
                                  </>
                                )}
                              </>
                            )}

                            {section.id === "milestones" && (
                              <>
                                <input
                                  value={section.content.titleTop}
                                  onChange={(e) => updateSectionContent(section.id, "titleTop", e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                  placeholder="Top Title Change Here"
                                />
                                <input
                                  value={section.content.titleBottom}
                                  onChange={(e) => updateSectionContent(section.id, "titleBottom", e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                  placeholder="Bottom Title Change Here"
                                />
                                <textarea
                                  value={section.content.subtitle}
                                  onChange={(e) => updateSectionContent(section.id, "subtitle", e.target.value)}
                                  rows={2}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                  placeholder="Subtitle"
                                />
                                <input
                                  type="text"
                                  value={section.content.overlayText}
                                  onChange={(e) => updateSectionContent(section.id, "overlayText", e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                  placeholder="Overlay text"
                                />
                                <div className="flex items-center gap-2 mb-2">
                                  <input
                                    type="checkbox"
                                    checked={section.content.showImage1}
                                    onChange={(e) => updateSectionContent(section.id, "showImage1", e.target.checked)}
                                    className="w-3 h-3"
                                  />
                                  <span className="text-xs text-gray-700">Show First Placeholder/Image</span>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                  <input
                                    type="checkbox"
                                    checked={section.content.showImage2}
                                    onChange={(e) => updateSectionContent(section.id, "showImage2", e.target.checked)}
                                    className="w-3 h-3"
                                  />
                                  <span className="text-xs text-gray-700">Show Second Placeholder/Image</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={section.content.useCustomImage}
                                    onChange={(e) =>
                                      updateSectionContent(section.id, "useCustomImage", e.target.checked)
                                    }
                                    className="w-3 h-3"
                                  />
                                  <span className="text-xs text-gray-700">Use custom image</span>
                                </div>
                                {section.content.useCustomImage && (
                                  <input
                                    type="text"
                                    value={section.content.backgroundImage}
                                    onChange={(e) =>
                                      updateSectionContent(section.id, "backgroundImage", e.target.value)
                                    }
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                    placeholder="Background image URL"
                                  />
                                )}
                                {section.content.useCustomImage && (
                                  <input
                                    type="text"
                                    value={section.content.backgroundImage2}
                                    onChange={(e) =>
                                      updateSectionContent(section.id, "backgroundImage2", e.target.value)
                                    }
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                    placeholder="Background image URL"
                                  />
                                )}
                                {!section.content.useCustomImage && (
                                  <div className="flex gap-2">
                                    <input
                                      type="color"
                                      value={section.styles?.backgroundColor || "#F3F4F6"}
                                      onChange={(e) =>
                                        updateSectionStyles(section.id, { backgroundColor: e.target.value })
                                      }
                                      className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                                      title="Background Color"
                                    />
                                    <input
                                      type="color"
                                      value={section.styles?.textColor || "#6B7280"}
                                      onChange={(e) => updateSectionStyles(section.id, { textColor: e.target.value })}
                                      className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                                      title="Text Color"
                                    />
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}

                        {section.id === "addedsection" && (
                          <>
                            <input
                              value={section.content.titleTop}
                              onChange={(e) => updateSectionContent(section.id, "titleTop", e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              placeholder="Top Title Change Here"
                            />
                            <input
                              value={section.content.titleBottom}
                              onChange={(e) => updateSectionContent(section.id, "titleBottom", e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              placeholder="Bottom Title Change Here"
                            />
                            <textarea
                              value={section.content.subtitle}
                              onChange={(e) => updateSectionContent(section.id, "subtitle", e.target.value)}
                              rows={2}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              placeholder="Subtitle"
                            />
                            <input
                              type="text"
                              value={section.content.overlayText}
                              onChange={(e) => updateSectionContent(section.id, "overlayText", e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              placeholder="Overlay text"
                            />
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={section.content.useCustomImage}
                                onChange={(e) => updateSectionContent(section.id, "useCustomImage", e.target.checked)}
                                className="w-3 h-3"
                              />
                              <span className="text-xs text-gray-700">Use custom image</span>
                            </div>
                            {section.content.useCustomImage && (
                              <input
                                type="text"
                                value={section.content.backgroundImage}
                                onChange={(e) => updateSectionContent(section.id, "backgroundImage", e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                placeholder="Background image URL"
                              />
                            )}
                            {section.content.useCustomImage && (
                              <input
                                type="text"
                                value={section.content.backgroundImage2}
                                onChange={(e) => updateSectionContent(section.id, "backgroundImage2", e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                placeholder="Background image URL"
                              />
                            )}
                            {!section.content.useCustomImage && (
                              <div className="flex gap-2">
                                <input
                                  type="color"
                                  value={section.styles?.backgroundColor || "#F3F4F6"}
                                  onChange={(e) => updateSectionStyles(section.id, { backgroundColor: e.target.value })}
                                  className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                                  title="Background Color"
                                />
                                <input
                                  type="color"
                                  value={section.styles?.textColor || "#6B7280"}
                                  onChange={(e) => updateSectionStyles(section.id, { textColor: e.target.value })}
                                  className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                                  title="Text Color"
                                />
                              </div>
                            )}
                          </>
                        )}

                        {/* Overview Controls */}
                        {section.id === "overview" && (
                          <>
                            <div className="space-y-2">
                              <input
                                value={section.content.titleTop}
                                onChange={(e) => updateSectionContent(section.id, "titleTop", e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                placeholder="Top Title Change Here"
                              />
                              <input
                                value={section.content.titleBottom}
                                onChange={(e) => updateSectionContent(section.id, "titleBottom", e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                placeholder="Bottom Title Change Here"
                              />
                              <textarea
                                value={section.content.subtitle}
                                onChange={(e) => updateSectionContent(section.id, "subtitle", e.target.value)}
                                rows={2}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                placeholder="Subtitle"
                              />
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-700">Buttons</span>
                                <button
                                  onClick={() => addButton(section.id)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              {section.content.buttons.map((button: string, index: number) => (
                                <div key={index} className="flex items-center gap-1">
                                  <input
                                    type="text"
                                    value={button}
                                    onChange={(e) => updateButton(section.id, index, e.target.value)}
                                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                                  />
                                  <button
                                    onClick={() => removeButton(section.id, index)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={section.styles?.backgroundColor || "#2563EB"}
                                onChange={(e) => updateSectionStyles(section.id, { backgroundColor: e.target.value })}
                                className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                                title="Button Background Color"
                              />
                              <input
                                type="color"
                                value={section.styles?.textColor || "#FFFFFF"}
                                onChange={(e) => updateSectionStyles(section.id, { textColor: e.target.value })}
                                className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                                title="Button Text Color"
                              />
                            </div>
                          </>
                        )}
                        {/* additional Controls */}
                        {section.id === "Additional" && (
                          <>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-700">Buttons</span>
                                <button
                                  onClick={() => addButton(section.id)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              {section.content.buttons.map((button: string, index: number) => (
                                <div key={index} className="flex items-center gap-1">
                                  <input
                                    type="text"
                                    value={button}
                                    onChange={(e) => updateButton(section.id, index, e.target.value)}
                                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                                  />
                                  <button
                                    onClick={() => removeButton(section.id, index)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                    {section.id.startsWith("custom-section-") && (
                      <>
                        <input
                          value={section.content.titleTop}
                          onChange={(e) => updateSectionContent(section.id, "titleTop", e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          placeholder="Top Title Change Here"
                        />
                        <input
                          value={section.content.titleBottom}
                          onChange={(e) => updateSectionContent(section.id, "titleBottom", e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          placeholder="Bottom Title Change Here"
                        />
                        <textarea
                          value={section.content.subtitle}
                          onChange={(e) => updateSectionContent(section.id, "subtitle", e.target.value)}
                          rows={2}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          placeholder="Subtitle"
                        />
                        <input
                          type="text"
                          value={section.content.overlayText}
                          onChange={(e) => updateSectionContent(section.id, "overlayText", e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          placeholder="Overlay text"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={section.content.useCustomImage}
                            onChange={(e) => updateSectionContent(section.id, "useCustomImage", e.target.checked)}
                            className="w-3 h-3"
                          />
                          <span className="text-xs text-gray-700">Use custom image</span>
                        </div>
                        {section.content.useCustomImage && (
                          <input
                            type="text"
                            value={section.content.backgroundImage}
                            onChange={(e) => updateSectionContent(section.id, "backgroundImage", e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            placeholder="Background image URL"
                          />
                        )}
                        {section.content.useCustomImage && (
                          <input
                            type="text"
                            value={section.content.backgroundImage2}
                            onChange={(e) => updateSectionContent(section.id, "backgroundImage2", e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            placeholder="Background image URL"
                          />
                        )}
                        {!section.content.useCustomImage && (
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={section.styles?.backgroundColor || "#F3F4F6"}
                              onChange={(e) => updateSectionStyles(section.id, { backgroundColor: e.target.value })}
                              className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                              title="Background Color"
                            />
                            <input
                              type="color"
                              value={section.styles?.textColor || "#6B7280"}
                              onChange={(e) => updateSectionStyles(section.id, { textColor: e.target.value })}
                              className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                              title="Text Color"
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Date Picker Modal */}
            <DatePicker
              isOpen={datePickerState.isOpen}
              onClose={closeDatePicker}
              selectedDates={getSelectedDates()}
              onDateSelect={handleDateSelect}
              month={sections.find((s: any) => s.id === "schedule")?.content.month || "January"}
              year={sections.find((s: any) => s.id === "schedule")?.content.year || 2025}
            />
          </div>
          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-4">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Email Preview</h2>
                <div className="flex items-center gap-2">
                  <div className="relative" ref={dropdownRef}>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setIsDownloadDropdownOpen(!isDownloadDropdownOpen)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download Sections
                        <svg
                          className={`w-4 h-4 transition-transform ${isDownloadDropdownOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleClearAll}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        Reset All
                      </button>
                    </div>

                    {isDownloadDropdownOpen && (
                      <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
                        <div className="p-2 flex flex-col">
                          <button
                            onClick={() => {
                              downloadAllSections();
                              setIsDownloadDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
                          >
                            <Download className="w-3 h-3" />
                            Download All Sections
                          </button>
                          <hr className="my-1" />
                          <button
                            onClick={() => {
                              downloadSectionAsImage("header");
                              setIsDownloadDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            Header
                          </button>
                          {sections
                            .filter((section: any) => section.visible)
                            .map((section: any) => (
                              <button
                                key={section.id}
                                onClick={() => {
                                  downloadSectionAsImage(section.id);
                                  setIsDownloadDropdownOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                              >
                                {section.title}
                              </button>
                            ))}
                          <button
                            onClick={() => {
                              downloadSectionAsImage("footer");
                              setIsDownloadDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            Footer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Email Template Preview */}
              <div ref={previewRef} className="bg-white overflow-hidden" style={{ width: "800px", margin: "0 auto" }}>
                <div id="section-header" className="relative h-[550px] bg-gradient-to-r overflow-hidden">
                  <div
                    className="relative bg-cover bg-center bg-no-repeat h-full w-full"
                    style={{
                      backgroundImage: `url('${emailData.headerBgImage}')`,
                    }}
                  >
                    {/* Content overlay */}
                    <div
                      className="absolute top-[120px] left-[55px] z-10 flex flex-col justify-around p-8 w-[550px] h-fit min-h-[255px]"
                      style={{
                        backgroundColor: emailData.overlayBgColor,
                      }}
                    >
                      <div className="flex  flex-col justify-center items-start h-full">
                        <div className="text-[32px] font-bold text-[#0084EE] flex-shrink-0">
                          <img src={emailData.logo} alt="" className="w-[210px] h-[auto]" />
                        </div>
                        <div>
                          <h1
                            className="text-[56px] font-bold mb-2 mt-2 leading-[110%]"
                            style={{ color: emailData.titleColor }}
                          >
                            {emailData.title}
                          </h1>
                        </div>
                        <div>
                          <p className="text-xl" style={{ color: emailData.dateRangeColor }}>
                            {emailData.dateRange}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* This Week at a Glance */}
                {sections.find((s: any) => s.id === "glance")?.visible && (
                  <div id="section-glance" className="relative">
                    <div className="absolute top-[100px] left-0 z-1  w-full overflow-hidden leading-none">
                      <img
                        src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748494424/Frame_629381_kzkmyn.png"
                        alt=""
                      />
                    </div>
                    <div className="pt-16 pb-12 px-8 ">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                          <h2 className="text-[36px] font-bold mt-[170px] mb-6">
                            {(() => {
                              const heading = sections.find((s: any) => s.id === "glance")?.content.heading || "";
                              const words = heading.trim().split(" ");
                              const lastWord = words.pop();
                              const rest = words.join(" ");

                              return (
                                <>
                                  <span className="text-[#000] z-10">{rest}</span>
                                  <span className="text-[52px] block leading-[0.8] text-[#0084EE] z-10">
                                    {lastWord}
                                  </span>
                                </>
                              );
                            })()}
                          </h2>

                          <p className="text-[#595959] leading-[1.4]">
                            {sections.find((s: any) => s.id === "glance")?.content.text}
                          </p>
                        </div>
                        <div className="flex justify-center bg-[#DBE8FF] py-5 px-0 rounded-xl z-10">
                          <img
                            src={
                              sections.find((s: any) => s.id === "glance")?.content.stickyNotesImage ||
                              "https://res.cloudinary.com/diii9yu7r/image/upload/v1748326135/calendar-planner-organization-management-remind-concept_1_1_vamgkx.png"
                            }
                            alt="Sticky Notes"
                            className="w-[90%] h-auto h-48 object-contain rounded-xl "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Executive Summary */}
                {sections.find((s: any) => s.id === "summary")?.visible && (
                  <div id="section-summary" className="px-8 py-12">
                    <div className="flex items-center justify-center my-8">
                      <div className="flex-grow border-t border-[#DDD]" style={{ borderWidth: "2px" }}></div>
                      <h2 className="px-4 text-[45px] font-bold whitespace-nowrap text-center">
                        <span className="text-[#555] leading-[0.1] text-[38px] ">
                          {sections.find((s: any) => s.id === "summary")?.content.titleTop}
                        </span>
                        <span className="text-[#000] block text-[58px] leading-[0.8]">
                          {sections.find((s: any) => s.id === "summary")?.content.titleBottom}
                        </span>
                      </h2>
                      <div className="flex-grow border-t border-[#DDD]" style={{ borderWidth: "2px" }}></div>
                    </div>
                    <div className="pb-20">
                      <p className="text-xl leading-[1.2] text-center text-[#4A4A4A]">
                        {sections.find((s: any) => s.id === "summary")?.content.text}
                      </p>
                    </div>
                    <div className="border-t border-[#DDD] p-10 mb-8 rounded-xl" style={{ borderWidth: "2px" }}>
                      <div className="flex justify-between items-center pb-12">
                        <div>
                          <img
                            src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748496364/Artboard_1-80_c1lvtu.jpg"
                            alt=""
                            style={{ width: "143px", height: "auto" }}
                          />
                        </div>
                        <div>
                          {/* <Dots /> */}
                          <img
                            src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748501768/p2u441nvtp1abvmi2mwp.png"
                            alt=""
                            style={{ width: "50px", height: "23px" }}
                          />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-[#000] text-[30px] font-bold pb-5">Executive Summary</h2>
                      </div>
                      <div className=" bg-[#0084EE] p-4 mb-1 rounded-t-xl items-center d-flex">
                        <h2 className="text-[#fff] font-bold uppercase  tracking-wider">Status update</h2>
                      </div>

                      <div className="grid grid-cols-3 gap-1 mb-8">
                        {sections
                          .find((s: any) => s.id === "summary")
                          ?.content.statusCards.map((card: StatusCard) => (
                            <div key={card.id} className="bg-white  overflow-hidden">
                              <div
                                className={`${getStatusCardColor(card.color)} text-white p-3 text-center font-semibold`}
                              >
                                {card.title}
                              </div>
                              <div className="p-4 bg-[#f8f8f8]">
                                <p
                                  className={`${getTextColor(card.color)} text-[14px] text-center uppercase font-bold`}
                                >
                                  {card.description}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                      {/* Overall Status */}
                      <div className="flex gap-4 mb-4">
                        <div>
                          <img
                            src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748501235/obikjdvbcdzdud6ojiue.png"
                            alt=""
                          />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 text-[25px]">Overall Status:</h3>
                      </div>

                      <div>
                        {sections
                          .find((s: any) => s.id === "summary")
                          ?.content.statusItems.map((item: StatusItem) => (
                            <div key={item.id} className="pb-3 ml-9">
                              <div className="flex items-start gap-3">
                                <div className="mt-[2px]">
                                  <span className="block">{getStatusIcon(item.status)}</span>
                                </div>

                                <div className="flex-1">
                                  <h4 className="text-[#4A4A4A]  leading-tight">{item.title}</h4>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="flex gap-4 mb-4 mt-8">
                        <img
                          src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748501235/obikjdvbcdzdud6ojiue.png"
                          alt=""
                          style={{ width: "22px", height: "24px" }}
                        />
                        <h3 className="text-xl font-bold text-gray-900 mb-1 text-[25px] ">Next:</h3>
                      </div>
                      {sections
                        .find((s: any) => s.id === "summary")
                        ?.content.nextItems.map((item: StatusItem) => (
                          <div key={item.id} className="pb-3 ml-9">
                            <div className="flex items-start gap-3 ">
                              <div className="mt-[2px]">
                                <img
                                  src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748503628/doticons_bjqtct.png"
                                  alt=""
                                  style={{ width: "16px", height: "auto" }}
                                />
                              </div>

                              <div className="flex-1 ">
                                <h4 className="text-[#4A4A4A]  leading-tight">{item.title}</h4>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Important Updates */}
                {sections.find((s: any) => s.id === "updates")?.visible && (
                  <div id="section-updates" className=" py-12 ">
                    <div className=" flex items-center  mb-8 relative">
                      <div className="absolute  z-[1] w-full top-12 ">
                        <img
                          src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748488830/Subtract_1_my79z1.png"
                          alt=""
                          className="w-full"
                        />
                      </div>

                      <h2 className=" text-[45px] font-bold whitespace-nowrap text-start z-[2] pt-32 px-8">
                        <span className="text-[#555] leading-[0.1] text-[38px] ">
                          {" "}
                          {sections.find((s: any) => s.id === "updates")?.content.titleTop}
                        </span>
                        <span className="text-[#000] block text-[58px] leading-[0.8]">
                          {" "}
                          {sections.find((s: any) => s.id === "updates")?.content.titleBottom}
                        </span>
                      </h2>
                      <div className="absolute right-[7rem] top-[50px] z-[2] ">
                        <img
                          src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748340755/get_vectorize_image_a0quqv.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="pb-10 w-2/3 px-8">
                      <p className="text-lg leading-[1.2] text-start text-[#4A4A4A]">
                        {sections.find((s: any) => s.id === "updates")?.content.text}
                      </p>
                    </div>
                    <div className="space-y-6 px-8">
                      {sections
                        .find((s: any) => s.id === "updates")
                        ?.content.projects.map((project: Project, index: number) => {
                          const isEven = index % 2 === 0;
                          const contentRadius = isEven
                            ? " rounded-tr-[15px] rounded-br-[15px]"
                            : " rounded-tl-[15px] rounded-bl-[15px]";

                          return (
                            <div
                              key={project.id}
                              className={`${getStatusCardColor(project.bgColor)} rounded-[16px] shadow-md p-1`}
                            >
                              <div className={`flex gap-6 ${isEven ? "flex-row" : "flex-row-reverse"}`}>
                                <img
                                  src={project.imageUrl || "/placeholder.svg"}
                                  alt={project.title}
                                  className="w-1/3  h-auto p-3 object-cover rounded-lg flex-shrink-0"
                                />
                                <div className={`flex-1 bg-white p-6 ${contentRadius}`}>
                                  <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                                  </div>
                                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Planned Tasks & Milestone */}
                {sections.find((s: any) => s.id === "milestones")?.visible && (
                  <div id="section-milestones" className="px-8 py-12">
                    <div className="flex items-center justify-center my-8">
                      <div className="flex-grow border-t border-[#DDD]" style={{ borderWidth: "2px" }}></div>
                      <h2 className="px-4 text-[45px] font-bold whitespace-nowrap text-center">
                        <span className="text-[#555] leading-[0.1] text-[38px] ">
                          {" "}
                          {sections.find((s: any) => s.id === "milestones")?.content.titleTop}
                        </span>
                        <span className="text-[#000] block text-[58px] leading-[0.8]">
                          {" "}
                          {sections.find((s: any) => s.id === "milestones")?.content.titleBottom}
                        </span>
                      </h2>
                      <div className="flex-grow border-t border-[#DDD]" style={{ borderWidth: "2px" }}></div>
                    </div>
                    <p className="text-xl leading-[1.2] text-center text-[#4A4A4A] mb-8">
                      {sections.find((s: any) => s.id === "milestones")?.content.subtitle}
                    </p>

                    <div className="relative  rounded-lg overflow-hidden">
                      {sections.find((s: any) => s.id === "milestones")?.content.showImage1 &&
                        (sections.find((s: any) => s.id === "milestones")?.content.useCustomImage ? (
                          <img
                            src={
                              sections.find((s: any) => s.id === "milestones")?.content.backgroundImage ||
                              "/placeholder.svg"
                            }
                            alt="Milestone Background"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center"
                            style={{
                              backgroundColor:
                                sections.find((s: any) => s.id === "milestones")?.styles?.backgroundColor || "#F3F4F6",
                              backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                              backgroundSize: "20px 20px",
                            }}
                          >
                            <p
                              className="font-medium"
                              style={{
                                color: sections.find((s: any) => s.id === "milestones")?.styles?.textColor || "#6B7280",
                              }}
                            >
                              {sections.find((s: any) => s.id === "milestones")?.content.overlayText}
                            </p>
                          </div>
                        ))}
                    </div>
                    <div className="relative mt-16 rounded-lg overflow-hidden">
                      {sections.find((s: any) => s.id === "milestones")?.content.showImage2 &&
                        (sections.find((s: any) => s.id === "milestones")?.content.useCustomImage ? (
                          <img
                            src={
                              sections.find((s: any) => s.id === "milestones")?.content.backgroundImage2 ||
                              "/placeholder.svg"
                            }
                            alt="Milestone Background"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center"
                            style={{
                              backgroundColor:
                                sections.find((s: any) => s.id === "milestones")?.styles?.backgroundColor || "#F3F4F6",
                              backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                              backgroundSize: "20px 20px",
                            }}
                          >
                            <p
                              className="font-medium"
                              style={{
                                color: sections.find((s: any) => s.id === "milestones")?.styles?.textColor || "#6B7280",
                              }}
                            >
                              {sections.find((s: any) => s.id === "milestones")?.content.overlayText}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Additional Section */}
                {sections.find((s: any) => s.id === "addedsection")?.visible && (
                  <div id="section-addedsection" className="px-8 py-12">
                    <div className="flex items-center justify-center my-8">
                      <div className="flex-grow border-t border-[#DDD]" style={{ borderWidth: "2px" }}></div>
                      <h2 className="px-4 text-[45px] font-bold whitespace-nowrap text-center">
                        <span className="text-[#555] leading-[0.1] text-[38px] ">
                          {" "}
                          {sections.find((s: any) => s.id === "addedsection")?.content.titleTop}
                        </span>
                        <span className="text-[#000] block text-[58px] leading-[0.8]">
                          {" "}
                          {sections.find((s: any) => s.id === "addedsection")?.content.titleBottom}
                        </span>
                      </h2>
                      <div className="flex-grow border-t border-[#DDD]" style={{ borderWidth: "2px" }}></div>
                    </div>
                    <p className="text-xl leading-[1.2] text-center text-[#4A4A4A] mb-8">
                      {sections.find((s: any) => s.id === "addedsection")?.content.subtitle}
                    </p>

                    <div className="relative  rounded-lg overflow-hidden">
                      {sections.find((s: any) => s.id === "addedsection")?.content.useCustomImage ? (
                        <img
                          src={
                            sections.find((s: any) => s.id === "addedsection")?.content.backgroundImage ||
                            "/placeholder.svg"
                          }
                          alt="Milestone Background"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center"
                          style={{
                            backgroundColor:
                              sections.find((s: any) => s.id === "milestones")?.styles?.backgroundColor || "#F3F4F6",
                            backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                            backgroundSize: "20px 20px",
                          }}
                        >
                          <p
                            className="font-medium"
                            style={{
                              color: sections.find((s: any) => s.id === "addedsection")?.styles?.textColor || "#6B7280",
                            }}
                          >
                            {sections.find((s: any) => s.id === "addedsection")?.content.overlayText}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="relative mt-16 rounded-lg overflow-hidden">
                      {sections.find((s: any) => s.id === "addedsection")?.content.useCustomImage ? (
                        <img
                          src={
                            sections.find((s: any) => s.id === "addedsection")?.content.backgroundImage2 ||
                            "/placeholder.svg"
                          }
                          alt="Milestone Background"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center"
                          style={{
                            backgroundColor:
                              sections.find((s: any) => s.id === "milestones")?.styles?.backgroundColor || "#F3F4F6",
                            backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                            backgroundSize: "20px 20px",
                          }}
                        >
                          <p
                            className="font-medium"
                            style={{
                              color: sections.find((s: any) => s.id === "milestones")?.styles?.textColor || "#6B7280",
                            }}
                          >
                            {sections.find((s: any) => s.id === "milestones")?.content.overlayText}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex justify-center">
                  <button
                    onClick={handleAddCustomSection}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                  >
                    + Add New Section
                  </button>
                </div>

                {sections
                  .filter((section: any) => section.id.startsWith("custom-section-"))
                  .map((section: any) => (
                    <div key={section.id} id={`section-${section.id}`} className="px-8 py-12">
                      {/* Section Header */}
                      <div className="flex items-center justify-center my-8">
                        <div className="flex-grow border-t border-[#DDD]" style={{ borderWidth: "2px" }}></div>
                        <h2 className="px-4 text-[45px] font-bold whitespace-nowrap text-center">
                          <span className="text-[#555] leading-[0.1] text-[38px] ">{section.content.titleTop}</span>
                          <span className="text-[#000] block text-[58px] leading-[0.8]">
                            {section.content.titleBottom}
                          </span>
                        </h2>
                        <div className="flex-grow border-t border-[#DDD]" style={{ borderWidth: "2px" }}></div>
                      </div>
                      <p className="text-xl leading-[1.2] text-center text-[#4A4A4A] mb-8">
                        {section.content.subtitle}
                      </p>
                      {/* Background 1 */}
                      <div className="relative rounded-lg overflow-hidden">
                        {section.content.useCustomImage ? (
                          <img
                            src={section.content.backgroundImage || "/placeholder.svg"}
                            alt="Section Background"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center"
                            style={{
                              backgroundColor: section.styles.backgroundColor || "#F3F4F6",
                              backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                              backgroundSize: "20px 20px",
                            }}
                          >
                            <p
                              className="font-medium"
                              style={{
                                color: section.styles.textColor || "#6B7280",
                              }}
                            >
                              {section.content.overlayText}
                            </p>
                          </div>
                        )}
                      </div>
                      {/* Background 2 */}
                      <div className="relative mt-16 rounded-lg overflow-hidden">
                        {section.content.useCustomImage ? (
                          <img
                            src={section.content.backgroundImage2 || "/placeholder.svg"}
                            alt="Section Background"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center"
                            style={{
                              backgroundColor: section.styles.backgroundColor || "#F3F4F6",
                              backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                              backgroundSize: "20px 20px",
                            }}
                          >
                            <p
                              className="font-medium"
                              style={{
                                color: section.styles.textColor || "#6B7280",
                              }}
                            >
                              {section.content.overlayText}
                            </p>
                          </div>
                        )}
                      </div>
                      {/* Delete Section Button (optional) */}
                      <div className="flex justify-center mt-6">
                        <button
                          onClick={() => setSections(sections.filter((s: any) => s.id !== section.id))}
                          className="delete-section-btn px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                        >
                          Delete Section
                        </button>
                      </div>
                    </div>
                  ))}
                {/* Time-Off Schedule */}
                {sections.find((s: any) => s.id === "schedule")?.visible && (
                  <div id="section-schedule" className="pb-16">
                    <div className="flex items-center justify-center my-8">
                      <div className="flex-grow border-t border-[#DDD]" style={{ borderWidth: "2px" }}></div>
                      <h2 className="px-4 text-[45px] font-bold whitespace-nowrap text-center">
                        <span className="text-[#555] leading-[0.1] text-[38px] ">
                          {sections.find((s: any) => s.id === "schedule")?.content.titleTop}
                        </span>
                        <span className="text-[#000] block text-[58px] leading-[0.8]">
                          {" "}
                          {sections.find((s: any) => s.id === "schedule")?.content.titleBottom}
                        </span>
                      </h2>
                      <div className="flex-grow border-t border-[#DDD]" style={{ borderWidth: "2px" }}></div>
                    </div>
                    <p className="text-xl leading-[1.2] text-center text-[#4A4A4A] mb-8">
                      {sections.find((s: any) => s.id === "schedule")?.content.subtitle}
                    </p>
                    {sections.find((s: any) => s.id === "schedule")?.content.useCalendarView ? (
                      // Calendar View
                      <div className="bg-white rounded-2xl   p-8 max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-20">
                          <div className="flex items-center gap-4">
                            <img
                              src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748496364/Artboard_1-80_c1lvtu.jpg"
                              alt=""
                              style={{ width: "143px", height: "auto" }}
                            />
                          </div>
                          <div>
                            <img
                              src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748501768/p2u441nvtp1abvmi2mwp.png"
                              alt=""
                              style={{ width: "50px", height: "23px" }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2  items-start">
                          {/* Left Side - Month Info */}

                          <div className="flex flex-col justify-between h-full">
                            <div className="space-y-6">
                              <h2 className="text-4xl font-bold text-gray-900 mb-8">Time-Off</h2>
                              <div className="flex items-center gap-3">
                                {/* <div className="w-0 h-0 border-l-8 border-l-blue-600 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div> */}
                                <img
                                  src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748501235/obikjdvbcdzdud6ojiue.png"
                                  alt=""
                                  style={{ width: "18px", height: "auto" }}
                                />
                                <span className="text-lg font-medium text-gray-700">
                                  Month: {sections.find((s: any) => s.id === "schedule")?.content.month}
                                </span>
                              </div>
                            </div>

                            {/* Legend */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-900">Out Of Office (OOO)</h3>
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <div className="w-4 h-4 bg-gray-800 rounded"></div>
                                  <span className="text-sm text-gray-600">Company Holidays</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                                  <span className="text-sm text-gray-600">National Holidays in Sri Lanka</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Side - Calendar */}
                          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden rounded-t-[30px]">
                            {/* Calendar Header */}
                            <div className="bg-[#004AAD] text-white p-4 text-center  ">
                              <h3 className="text-lg font-semibold">
                                {sections.find((s: any) => s.id === "schedule")?.content.month}{" "}
                                {sections.find((s: any) => s.id === "schedule")?.content.year}
                              </h3>
                            </div>

                            {/* Calendar Grid */}
                            <div className="p-4">
                              {/* Days of Week */}
                              <div className="grid grid-cols-7 gap-1 mb-2">
                                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                                  <div
                                    key={day}
                                    className="w-10 h-8 flex items-center justify-center text-xs font-medium text-gray-500"
                                  >
                                    {day}
                                  </div>
                                ))}
                              </div>

                              {/* Calendar Days */}
                              <div className="grid grid-cols-7 gap-1">
                                {renderCalendar(sections.find((s: any) => s.id === "schedule"))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Original Placeholder View
                      <div>
                        <div className="relative h-48 rounded-lg overflow-hidden">
                          {sections.find((s: any) => s.id === "schedule")?.content.useCustomImage ? (
                            <img
                              src={
                                sections.find((s: any) => s.id === "schedule")?.content.backgroundImage ||
                                "/placeholder.svg"
                              }
                              alt="Schedule Background"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div
                              className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center"
                              style={{
                                backgroundColor:
                                  sections.find((s: any) => s.id === "schedule")?.styles?.backgroundColor || "#F3F4F6",
                                backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                                backgroundSize: "20px 20px",
                              }}
                            >
                              <p
                                className="font-medium"
                                style={{
                                  color: sections.find((s: any) => s.id === "schedule")?.styles?.textColor || "#6B7280",
                                }}
                              >
                                {sections.find((s: any) => s.id === "schedule")?.content.overlayText}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Segmented Overview of Updates */}
                {sections.find((s: any) => s.id === "overview")?.visible && (
                  <div className="py-12">
                    <div className="py-8" id="section-overview">
                      <div className="flex items-center justify-center my-8">
                        <div className="flex-grow border-t border-[#DDD]" style={{ borderWidth: "2px" }}></div>
                        <h2 className="px-4 text-[45px] font-bold whitespace-nowrap text-center">
                          <span className="text-[#555] leading-[0.1] text-[38px] ">
                            {" "}
                            {sections.find((s: any) => s.id === "overview")?.content.titleTop}
                          </span>
                          <span className="text-[#000] block text-[58px] leading-[0.8]">
                            {" "}
                            {sections.find((s: any) => s.id === "overview")?.content.titleBottom}
                          </span>
                        </h2>
                        <div className="flex-grow border-t border-[#DDD]" style={{ borderWidth: "2px" }}></div>
                      </div>
                      <p className="text-xl leading-[1.2] text-center text-[#4A4A4A] mb-8">
                        {sections.find((s: any) => s.id === "overview")?.content.subtitle}
                      </p>
                    </div>
                    <div className="space-y-4">
                      {sections
                        .find((s: any) => s.id === "overview")
                        ?.content.buttons.map((button: string, index: number) => (
                          <div id={`section-${button}`} key={index} className="pb-8">
                            {/* <div className="pb-4"> */}
                            <div
                              className="p-6 rounded-[32px] cursor-pointer transition-colors group w-2/3 mx-auto"
                              style={{
                                backgroundColor:
                                  sections.find((s: any) => s.id === "overview")?.styles?.backgroundColor || "#0084EE",
                                color: sections.find((s: any) => s.id === "overview")?.styles?.textColor || "#FFFFFF",
                              }}
                              onClick={() => downloadSectionAsImage(button)} // ← attach handler here
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-lg">{button}</span>
                                <img
                                  src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748504399/arrowicons_zb1t9e.png"
                                  alt=""
                                  style={{ width: "44px", height: "auto" }}
                                />
                              </div>
                            </div>
                          </div>
                          // </div>
                        ))}
                    </div>
                  </div>
                )}

                {sections.find((s: any) => s.id === "Additional")?.visible && (
                  <>
                    <div className="pb-16">
                      <div
                        id="section-Additional"
                        className="text-center text-[#4A4A4A] flex justify-center text-[30px] py-8"
                        style={{ width: "800px" }}
                      >
                        Additional Resources
                      </div>
                      <div className="space-y-4">
                        {sections
                          .find((s: any) => s.id === "Additional")
                          ?.content.buttons.map((button: string, index: number) => (
                            <div id={`section-${button}`} key={index} className="pb-8">
                              <div
                                className="p-6 rounded-[32px] cursor-pointer transition-colors group w-2/3 mx-auto"
                                style={{
                                  backgroundColor:
                                    sections.find((s: any) => s.id === "overview")?.styles?.backgroundColor ||
                                    "#0084EE",
                                  color: sections.find((s: any) => s.id === "overview")?.styles?.textColor || "#FFFFFF",
                                }}
                                onClick={() => downloadSectionAsImage(button)}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-lg">{button}</span>
                                  <img
                                    src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748504399/arrowicons_zb1t9e.png"
                                    alt=""
                                    style={{ width: "44px", height: "auto" }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </>
                )}

                <div
                  id="section-footer"
                  className=" py-8 px-8 text-center pb-16  flex justify-center my-8 border-t border-t-[rgba(0,0,0,0.12)] p-10"
                >
                  <img
                    src="https://res.cloudinary.com/diii9yu7r/image/upload/v1748496364/Artboard_1-80_c1lvtu.jpg"
                    alt=""
                    style={{ width: "143px", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-1">
            <button
              onClick={handleSaveDraft}
              className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 mb-2"
            >
              Save as Draft
            </button>
            {/* Export/Import Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => {
                  if (drafts.length === 0) {
                    alert("Before export, please save a draft!");
                    return;
                  }
                  const dataStr = JSON.stringify(drafts, null, 2);
                  const blob = new Blob([dataStr], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "email-builder-drafts.json";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
              >
                Export Drafts
              </button>
              <label className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs cursor-pointer">
                Import Drafts
                <input
                  type="file"
                  accept="application/json"
                  style={{ display: "none" }}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const text = await file.text();
                      const importedDrafts = JSON.parse(text);

                      if (!Array.isArray(importedDrafts)) {
                        alert("Invalid file format.");
                        return;
                      }

                      // Avoid duplicate IDs, merge by name+createdAt or just append with new IDs
                      const newDrafts = importedDrafts.map((d) => ({
                        ...d,
                        id: d.id || `${Date.now()}-${Math.random()}`,
                      }));
                      const merged = [...newDrafts, ...drafts];
                      setDrafts(merged);
                      saveDrafts(merged);
                      alert("Drafts imported!");
                    } catch (err) {
                      alert("Failed to import: " + err.message);
                    }
                  }}
                />
              </label>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Drafts</h4>
              {drafts.length === 0 && <div className="text-gray-400 text-sm">No drafts yet.</div>}
              {drafts.map((draft) => (
                <div key={draft.id} className="flex items-center justify-between mb-1 bg-gray-50 px-2 py-1 rounded">
                  <span className="flex-1 cursor-pointer" onClick={() => handleLoadDraft(draft)}>
                    {draft.name}{" "}
                    <span className="text-xs text-gray-500">({new Date(draft.createdAt).toLocaleString()})</span>
                  </span>
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteDraft(draft.id)}
                    title="Delete draft"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {/* ...rest of your builder UI... */}
          </div>
        </div>
      </div>
    </div>
  );
}
