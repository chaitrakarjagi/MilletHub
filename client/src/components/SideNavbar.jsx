import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const navSections = [
  {
    label: "Shop",
    icon: "M20 13H4V6h16m0-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z",
    children: [
      { label: "All Products", to: "/" },
      { label: "Whole Millet", to: "/whole-millet" },
      { label: "Flour Millet", to: "/flour-millet" },
    ]
  }
];

export default function SideNavbar() {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState("Shop");
  const { user } = useContext(AuthContext);

  // Only show sidebar if user is logged in
  if (!user) {
    return null;
  }

  const toggleSection = (label) => {
    setExpandedSection((current) => (current === label ? "" : label));
  };

  const isActive = (to) => location.pathname === to;

  return (
    <aside className="hidden lg:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 overflow-y-auto border-r border-gray-200 bg-white shadow-sm flex flex-col">
      <div className="p-5 space-y-6 flex-1">
        <div className="space-y-4">
          {navSections.map((section) => (
            <div key={section.label} className="rounded-3xl border border-gray-100 bg-gray-50">
              <button
                type="button"
                onClick={() => toggleSection(section.label)}
                className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-100 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{section.label}</p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    expandedSection === section.label ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {expandedSection === section.label && (
                <div className="space-y-1 border-t border-gray-200 px-2 py-2">
                  {section.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive(child.to)
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
