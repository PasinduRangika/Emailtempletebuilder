"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Download,
  Eye,
  EyeOff,
  Settings,
  Layout,
  Bell,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Target,
  X,
  Plus,
} from "lucide-react";

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
}

export default function WeeklyPlanBuilder() {
  const [emailData, setEmailData] = useState({
    title: "Weekly Plan",
    dateRange: "Week of May 3 – May 7",
    company: "CODIMITE",
    headerBgImage: "https://res.cloudinary.com/diii9yu7r/image/upload/v1748259697/Hero-BG-5_ltg44g.png",
  });

  const [sections, setSections] = useState<Section[]>([
    {
      id: "glance",
      title: "This Week at a Glance",
      visible: true,
      content: {
        heading: "THIS WEEK AT A GLANCE",
        text: "Here’s a comprehensive summary of the project’s progress and upcoming steps.",
        stickyNotesImage:
          "https://res.cloudinary.com/diii9yu7r/image/upload/v1748326135/calendar-planner-organization-management-remind-concept_1_1_vamgkx.png",
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
          { id: "1", title: "On Track", color: "green", description: "Projects proceeding as planned" },
          { id: "2", title: "Needs Attention", color: "yellow", description: "Requires monitoring" },
          { id: "3", title: "Blocked", color: "red", description: "Issues need resolution" },
          // { id: "4", title: "Completed", color: "blue", description: "Successfully finished" },
        ],
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
        statusItems: [
          {
            id: "1",
            icon: "check",
            title: "Database Migration",
            description: "Successfully migrated user data to new infrastructure",
            nextStep: "Monitor performance metrics",
            status: "completed",
          },
          {
            id: "2",
            icon: "clock",
            title: "Frontend QA",
            description: "Quality assurance testing in progress",
            nextStep: "Complete regression testing",
            status: "progress",
          },
          {
            id: "3",
            icon: "warning",
            title: "API Integration",
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
        projects: [
          {
            id: "1",
            title: "Overall Project",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            status: "In Progress",
            priority: "High",
            imageUrl: "/placeholder.svg?height=80&width=120",
          },
          {
            id: "2",
            title: "Overall Project",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            status: "Review",
            priority: "Medium",
            imageUrl: "/placeholder.svg?height=80&width=120",
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
        useCustomImage: false,
        overlayText: "Milestone Timeline Placeholder",
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
        subtitle: "Team availability and scheduled time off",
        backgroundImage: "/placeholder.svg?height=200&width=800",
        useCustomImage: false,
        overlayText: "Schedule Grid Placeholder",
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
        buttons: [
          "New Customer Onboarding Updates",
          "Customer Issue Resolution Updates",
          "Development Request Updates",
          "New Upgrade 1",
          "New Upgrade 2",
          "New Upgrade 3",
        ],
      },
      styles: {
        backgroundColor: "#2563EB",
        textColor: "#FFFFFF",
      },
    },
  ]);

  const previewRef = useRef<HTMLDivElement>(null);

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) => (section.id === sectionId ? { ...section, visible: !section.visible } : section))
    );
  };

  const updateSectionContent = (sectionId: string, field: string, value: any) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, content: { ...section.content, [field]: value } } : section
      )
    );
  };

  const updateSectionStyles = (sectionId: string, styles: any) => {
    setSections(
      sections.map((section) =>
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
    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      updateSectionContent(sectionId, "statusCards", [...section.content.statusCards, newCard]);
    }
  };

  const updateStatusCard = (sectionId: string, cardId: string, field: string, value: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      const updatedCards = section.content.statusCards.map((card: StatusCard) =>
        card.id === cardId ? { ...card, [field]: value } : card
      );
      updateSectionContent(sectionId, "statusCards", updatedCards);
    }
  };

  const removeStatusCard = (sectionId: string, cardId: string) => {
    const section = sections.find((s) => s.id === sectionId);
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
    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      updateSectionContent(sectionId, "statusItems", [...section.content.statusItems, newItem]);
    }
  };

  const updateStatusItem = (sectionId: string, itemId: string, field: string, value: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      const updatedItems = section.content.statusItems.map((item: StatusItem) =>
        item.id === itemId ? { ...item, [field]: value } : item
      );
      updateSectionContent(sectionId, "statusItems", updatedItems);
    }
  };

  const removeStatusItem = (sectionId: string, itemId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      const updatedItems = section.content.statusItems.filter((item: StatusItem) => item.id !== itemId);
      updateSectionContent(sectionId, "statusItems", updatedItems);
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
    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      updateSectionContent(sectionId, "projects", [...section.content.projects, newProject]);
    }
  };

  const updateProject = (sectionId: string, projectId: string, field: string, value: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      const updatedProjects = section.content.projects.map((project: Project) =>
        project.id === projectId ? { ...project, [field]: value } : project
      );
      updateSectionContent(sectionId, "projects", updatedProjects);
    }
  };

  const removeProject = (sectionId: string, projectId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      const updatedProjects = section.content.projects.filter((project: Project) => project.id !== projectId);
      updateSectionContent(sectionId, "projects", updatedProjects);
    }
  };

  const addButton = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      updateSectionContent(sectionId, "buttons", [...section.content.buttons, "New Button"]);
    }
  };

  const updateButton = (sectionId: string, index: number, value: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      const updatedButtons = [...section.content.buttons];
      updatedButtons[index] = value;
      updateSectionContent(sectionId, "buttons", updatedButtons);
    }
  };

  const removeButton = (sectionId: string, index: number) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      const updatedButtons = section.content.buttons.filter((_: string, i: number) => i !== index);
      updateSectionContent(sectionId, "buttons", updatedButtons);
    }
  };

  const downloadAsImage = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current, {
          backgroundColor: "#ffffff",
          scale: 3,
          useCORS: true,
          height: previewRef.current.scrollHeight,
          width: previewRef.current.scrollWidth,
        });

        const link = document.createElement("a");
        link.download = "weekly-plan.png";
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "progress":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "blocked":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
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

  const backgroundImg = "url('https://codimite.flywheelstaging.com/wp-content/uploads/Hero-BG-5.jpg')";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Weekly Plan Email Builder</h1>
          <p className="text-gray-600">Create and customize your professional weekly plan email</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Preview Section - Takes 3 columns */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-4">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Email Preview</h2>
                <button
                  onClick={downloadAsImage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </button>
              </div>

              {/* Email Template Preview */}
              <div ref={previewRef} className="bg-white overflow-hidden" style={{ width: "800px", margin: "0 auto" }}>
                <div className="relative h-[550px] bg-gradient-to-r overflow-hidden">
                  <div
                    className="relative bg-contain bg-center bg-no-repeat h-full w-full"
                    style={{
                      backgroundImage: `url('${emailData.headerBgImage}')`,
                    }}
                  >
                    {/* Content overlay */}
                    <div className="absolute top-[120px] left-[55px] z-10 flex flex-col justify-between p-8 bg-[#191919] w-[550px] h-[240px]">
                      <div className="flex  flex-col justify-between items-start h-full">
                        <div className="text-[32px] font-bold text-[#0084EE]">{emailData.company}</div>
                        <h1 className="text-[56px] font-bold mb-2 text-white">{emailData.title}</h1>
                        <p className="text-xl text-white">{emailData.dateRange}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* This Week at a Glance */}
                {sections.find((s) => s.id === "glance")?.visible && (
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full overflow-hidden leading-none"></div>
                    <div className="pt-16 pb-12 px-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                          {/* <h2
                            className="text-3xl font-bold mb-4"
                            style={{
                              color: sections.find((s) => s.id === "glance")?.styles?.textColor || "#1E40AF",
                            }}
                          >
                            {sections.find((s) => s.id === "glance")?.content.heading}
                          </h2> */}
                          <h2 className="text-[36px] font-bold mb-4">
                            {(() => {
                              const heading = sections.find((s) => s.id === "glance")?.content.heading || "";
                              const words = heading.trim().split(" ");
                              const lastWord = words.pop();
                              const rest = words.join(" ");

                              return (
                                <>
                                  <span className="text-[#000]">{rest}</span>
                                  <span className="text-[52px] block leading-[0.8] text-[#0084EE]">{lastWord}</span>
                                </>
                              );
                            })()}
                          </h2>

                          <p className="text-[#595959] leading-[1.4]">
                            {sections.find((s) => s.id === "glance")?.content.text}
                          </p>
                        </div>
                        <div className="flex justify-center bg-[#DBE8FF] py-5 px-0 rounded-xl">
                          <img
                            src={
                              sections.find((s) => s.id === "glance")?.content.stickyNotesImage ||
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
                {sections.find((s) => s.id === "summary")?.visible && (
                  <div className="px-8 py-12">
                    <div className="flex items-center justify-center my-8">
                      <div className="flex-grow border-t border-[#DDD]" style={{ borderWidth: "2px" }}></div>
                      <h2 className="px-4 text-[45px] font-bold whitespace-nowrap text-center">
                        <span className="text-[#555] leading-[0.1] text-[38px] ">Executive</span>
                        <span className="text-[#000] block text-[58px] leading-[0.8]">Summary</span>
                      </h2>
                      <div className="flex-grow border-t border-[#DDD]" style={{ borderWidth: "2px" }}></div>
                    </div>
                    <div className="pb-8">
                      <p className="text-xl leading-[1.2] text-center text-[#4A4A4A]">
                        {sections.find((s) => s.id === "summary")?.content.text}
                      </p>
                    </div>
                    <div className=" bg-[#0084EE] p-4 mb-4 rounded-t-xl items-center d-flex">
                      <h2 className="text-[#fff] font-bold">STATUS UPDATE</h2>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {sections
                        .find((s) => s.id === "summary")
                        ?.content.statusCards.map((card: StatusCard) => (
                          <div key={card.id} className="bg-white  overflow-hidden">
                            <div
                              className={`${getStatusCardColor(card.color)} text-white p-3 text-center font-semibold`}
                            >
                              {card.title}
                            </div>
                            <div className="p-4 bg-[#f8f8f8]">
                              <p className={`${getTextColor(card.color)} text-[14px] text-center`}>
                                {card.description}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                    {/* Overall Status */}
                    <h3 className="text-xl font-bold text-gray-900 mb-1 text-[25px]">Overall Status:</h3>
                    <div>
                      {sections
                        .find((s) => s.id === "summary")
                        ?.content.statusItems.map((item: StatusItem) => (
                          <div key={item.id}>
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10  flex items-center justify-center">
                                {getStatusIcon(item.status)}
                              </div>
                              <div className="flex-1">
                                <h4 className=" text-[#4A4A4A] font-semibold ">{item.title}</h4>
                                {/* <p className="text-gray-700 mb-2">{item.description}</p> */}
                                {/* <p className="text-sm text-gray-500">Next Step: {item.nextStep}</p> */}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 text-[25px] pt-8">Next:</h3>
                  </div>
                )}

                {/* Important Updates */}
                {sections.find((s) => s.id === "updates")?.visible && (
                  <div className="px-8 py-12 bg-gray-50">
                    <div className="flex items-center gap-3 mb-8">
                      <Bell className="w-6 h-6 text-blue-600" />
                      <h2 className="text-3xl font-bold text-gray-900">Important Updates</h2>
                    </div>

                    <div className="space-y-6">
                      {sections
                        .find((s) => s.id === "updates")
                        ?.content.projects.map((project: Project) => (
                          <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex gap-6">
                              <img
                                src={project.imageUrl || "/placeholder.svg"}
                                alt={project.title}
                                className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                  <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                                  <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                      {project.status}
                                    </span>
                                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                                      {project.priority}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{project.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Planned Tasks & Milestone */}
                {sections.find((s) => s.id === "milestones")?.visible && (
                  <div className="px-8 py-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Planned Tasks & Milestone</h2>
                    <p className="text-gray-600 mb-6">
                      {sections.find((s) => s.id === "milestones")?.content.subtitle}
                    </p>

                    <div className="relative h-48 rounded-lg overflow-hidden">
                      {sections.find((s) => s.id === "milestones")?.content.useCustomImage ? (
                        <img
                          src={
                            sections.find((s) => s.id === "milestones")?.content.backgroundImage || "/placeholder.svg"
                          }
                          alt="Milestone Background"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center"
                          style={{
                            backgroundColor:
                              sections.find((s) => s.id === "milestones")?.styles?.backgroundColor || "#F3F4F6",
                            backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                            backgroundSize: "20px 20px",
                          }}
                        >
                          <p
                            className="font-medium"
                            style={{
                              color: sections.find((s) => s.id === "milestones")?.styles?.textColor || "#6B7280",
                            }}
                          >
                            {sections.find((s) => s.id === "milestones")?.content.overlayText}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Time-Off Schedule */}
                {sections.find((s) => s.id === "schedule")?.visible && (
                  <div className="px-8 py-12 bg-gray-50">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Time-Off Schedule</h2>
                    <p className="text-gray-600 mb-6">{sections.find((s) => s.id === "schedule")?.content.subtitle}</p>

                    <div className="relative h-48 rounded-lg overflow-hidden">
                      {sections.find((s) => s.id === "schedule")?.content.useCustomImage ? (
                        <img
                          src={sections.find((s) => s.id === "schedule")?.content.backgroundImage || "/placeholder.svg"}
                          alt="Schedule Background"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center"
                          style={{
                            backgroundColor:
                              sections.find((s) => s.id === "schedule")?.styles?.backgroundColor || "#F3F4F6",
                            backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                            backgroundSize: "20px 20px",
                          }}
                        >
                          <p
                            className="font-medium"
                            style={{
                              color: sections.find((s) => s.id === "schedule")?.styles?.textColor || "#6B7280",
                            }}
                          >
                            {sections.find((s) => s.id === "schedule")?.content.overlayText}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Segmented Overview of Updates */}
                {sections.find((s) => s.id === "overview")?.visible && (
                  <div className="px-8 py-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Segmented Overview of Updates</h2>

                    <div className="space-y-4">
                      {sections
                        .find((s) => s.id === "overview")
                        ?.content.buttons.map((button: string, index: number) => (
                          <div
                            key={index}
                            className="p-6 rounded-xl shadow-lg cursor-pointer transition-colors group"
                            style={{
                              backgroundColor:
                                sections.find((s) => s.id === "overview")?.styles?.backgroundColor || "#2563EB",
                              color: sections.find((s) => s.id === "overview")?.styles?.textColor || "#FFFFFF",
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-semibold">{button}</span>
                              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="bg-gray-900 text-white py-8 px-8 text-center">
                  <div className="text-2xl font-bold">{emailData.company}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section - Takes 1 column */}
          <div className="xl:col-span-1 space-y-4 max-h-screen overflow-y-auto">
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
                  <label className="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
                  <input
                    type="text"
                    value={emailData.dateRange}
                    onChange={(e) => setEmailData({ ...emailData, dateRange: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={emailData.company}
                    onChange={(e) => setEmailData({ ...emailData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              </div>
            </div>

            {/* Section Controls */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Section Controls
              </h3>
              <div className="space-y-4">
                {sections.map((section) => (
                  <div key={section.id} className="border border-gray-200 rounded p-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-900">{section.title}</span>
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
                            {/* <div className="flex gap-2">
                              <input
                                type="color"
                                value={section.styles?.backgroundColor || "#ffffff"}
                                onChange={(e) => updateSectionStyles(section.id, { backgroundColor: e.target.value })}
                                className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                                title="Background Color"
                              />
                              <input
                                type="color"
                                value={section.styles?.textColor || "#1E40AF"}
                                onChange={(e) => updateSectionStyles(section.id, { textColor: e.target.value })}
                                className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                                title="Text Color"
                              />
                            </div> */}
                          </>
                        )}

                        {/* Executive Summary Controls */}
                        {section.id === "summary" && (
                          <>
                            <div className="space-y-2">
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
                                  {/* <textarea
                                    value={item.description}
                                    onChange={(e) =>
                                      updateStatusItem(section.id, item.id, "description", e.target.value)
                                    }
                                    rows={2}
                                    className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                                  />
                                  <input
                                    type="text"
                                    value={item.nextStep}
                                    onChange={(e) => updateStatusItem(section.id, item.id, "nextStep", e.target.value)}
                                    className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                                    placeholder="Next step"
                                  /> */}
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
                          </>
                        )}

                        {/* Important Updates Controls */}
                        {section.id === "updates" && (
                          <div className="space-y-2">
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
                                <div className="flex gap-1">
                                  <input
                                    type="text"
                                    value={project.status}
                                    onChange={(e) => updateProject(section.id, project.id, "status", e.target.value)}
                                    className="flex-1 px-1 py-1 border border-gray-300 rounded text-xs"
                                    placeholder="Status"
                                  />
                                  <input
                                    type="text"
                                    value={project.priority}
                                    onChange={(e) => updateProject(section.id, project.id, "priority", e.target.value)}
                                    className="flex-1 px-1 py-1 border border-gray-300 rounded text-xs"
                                    placeholder="Priority"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Milestones and Schedule Controls */}
                        {(section.id === "milestones" || section.id === "schedule") && (
                          <>
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
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
