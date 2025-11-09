"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { companyInfo, contactInfo } from "@/data/company-data";
import { footerQuickLinks } from "@/data/navigation-data";
import { uiTexts } from "@/data/ui-texts";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 via-pink-500 to-red-600 shadow-lg"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xl text-white font-bold">M</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-gray-900">
                  {companyInfo.name.latin}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {companyInfo.legalForm}
                </span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {companyInfo.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {uiTexts.sections.divisions}
            </h3>
            <div className="flex flex-col space-y-3">
              {footerQuickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300 inline-flex items-center group"
                  style={{
                    ["--hover-color" as any]: link.color,
                  }}
                >
                  <motion.span
                    className="w-0 group-hover:w-2 h-0.5 mr-0 group-hover:mr-2 transition-all duration-300"
                    style={{ backgroundColor: link.color }}
                  />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {uiTexts.sections.contactInfo}
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-3 text-gray-600">
                <MapPin size={20} className="mt-1 shrink-0 text-gray-400" />
                <span>{contactInfo.address.full}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone size={20} className="shrink-0 text-gray-400" />
                <a
                  href={`tel:${contactInfo.phone.main}`}
                  className="hover:text-gray-900 transition-colors"
                >
                  {contactInfo.phone.display}
                </a>
              </div>
              <div className="flex items-start space-x-3 text-gray-600">
                <Clock size={20} className="mt-1 shrink-0 text-gray-400" />
                <span>{contactInfo.hours.display}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} {companyInfo.name.cyrillic}{" "}
            {companyInfo.legalForm}. Всички права запазени.
          </p>
          <span>
            Powered by{" "}
            <Link href="https://portfolio.melihzafer.me">Melih Hyusein</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
