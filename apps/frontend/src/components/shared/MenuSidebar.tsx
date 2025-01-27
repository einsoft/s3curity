"use client";

import { IconList, IconSettings } from "@tabler/icons-react";

export default function MenuSidebar() {
  return (
    <div className="min-w-[240px] pl-4 rounded-lg">
      <nav className="flex flex-col gap-1 font-sans text-base font-normal text-blue-gray-700">
        <div
          role="button"
          className="flex items-center w-full p-3 leading-tight transition-all rounded-l-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 bg-[#a1a1aa1a]"
        >
          <div className="grid mr-4 place-items-center">
            <IconSettings />
          </div>
          Gerenciar
        </div>
        <div
          role="button"
          className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        >
          <div className="grid mr-4 place-items-center">
            <IconList />
          </div>
          Visualizar
        </div>
      </nav>
    </div>
  );
}
