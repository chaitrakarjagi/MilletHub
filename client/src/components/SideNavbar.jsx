import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navSections = [
  {
    label: "Shop",
    icon: "M20 13H4V6h16m0-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z",
    children: [
      { label: "All Products", to: "/" },
      { label: "Whole Millat", to: "/whole-millet" },
      { label: "Flour Millet", to: "/flour-millet" },
     { label: "Recipes", to: "/whole-millet" },
      { label: "Recipes", to: "/flour-millet" },
       { label: "Recipes", to: "/flour-millet" }
    
    ]
  }
];

export default function SideNavbar() {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState("Shop");

  const toggleSection = (label) => {
    setExpandedSection((current) => (current === label ? "" : label));
  };

  const isActive = (to) => location.pathname === to;

  return (
    <aside className="hidden lg:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 overflow-y-auto border-r border-gray-200 bg-white shadow-sm flex flex-col">
      <div className="p-5 space-y-6 flex-1">
        {/* <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500 mb-3">Navigation</h2>
          <p className="text-sm text-gray-600">Quick access to important sections</p>
        </div> */}

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
                    <p className="text-sm font-semibold text-gray-900">{section.label}</p>
                    <p className="text-xs text-gray-500">{section.children.length} items</p>
                  </div>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${expandedSection === section.label ? "rotate-180" : "rotate-0"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedSection === section.label && (
                <div className="space-y-1 px-4 pb-4">
                  {section.children.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${isActive(item.to) ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-50"}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 border-t border-gray-200">
        <div className="rounded-3xl bg-blue-600 p-5 text-white shadow-lg">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] mb-2">Need help?</h3>
          <p className="text-sm leading-6">
            Contact our support team or check the help center for quick answers.
          </p>
        </div>
      </div>
    </aside>
  );
}
