"use client";

import { IconList, IconSettings } from "@tabler/icons-react";

export default function MenuSidebar() {
  return (
    <div className="min-w-[240px] rounded-lg pl-4">
      <nav className="text-blue-gray-700 flex flex-col gap-1 font-sans text-base font-normal">
        <div
          role="button"
          className="hover:bg-blue-gray-50 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:text-blue-gray-900 active:bg-blue-gray-50 active:text-blue-gray-900 flex w-full items-center rounded-l-lg bg-[#a1a1aa1a] p-3 text-start leading-tight outline-none transition-all hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80"
        >
          <div className="mr-4 grid place-items-center">
            <IconSettings />
          </div>
          Gerenciar
        </div>
        <div
          role="button"
          className="hover:bg-blue-gray-50 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:text-blue-gray-900 active:bg-blue-gray-50 active:text-blue-gray-900 flex w-full items-center rounded-lg p-3 text-start leading-tight outline-none transition-all hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80"
        >
          <div className="mr-4 grid place-items-center">
            <IconList />
          </div>
          Visualizar
        </div>
      </nav>
    </div>
  );
}
