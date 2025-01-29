import React from "react";

import { Checkbox } from "@/src/components/ui/checkbox";

const AssociaPermissao = ({
  permissoes,
  setPermissoes,
}: {
  permissoes: number[];
  setPermissoes: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const profiles = [
    { type: "Cliente", count: 3, id: 1 },
    { type: "Parceiro", count: 2, id: 2 },
    { type: "Cliente", count: 2, id: 3 },
    { type: "Parceiro", count: 2, id: 4 },
    { type: "Cliente", count: 2, id: 5 },
    { type: "Parceiro", count: 2, id: 6 },
    { type: "Cliente", count: 2, id: 7 },
    { type: "Parceiro", count: 2, id: 8 },
  ];

  return (
    <div className="border border-zinc-500 rounded-lg">
      <h1 className="text-l font-bold p-2 bg-zinc-500 rounded-tl-lg rounded-rl-lg">
        Permissões
      </h1>
      <div className="flex p-8 gap-8">
        {profiles.map((profile, index) => (
          <div
            key={profile.type + index}
            className="flex pr-5 items-center justify-center"
          >
            <Checkbox
              id={profile.id.toString()}
              checked={permissoes.includes(profile.id)}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                console.log(
                  `Checkbox ${profile.id} changed to ${target.checked}`,
                );
                if (target.checked) {
                  setPermissoes((prev) => [...prev, profile.id]);
                } else {
                  setPermissoes((prev) =>
                    prev.filter((id) => id !== profile.id),
                  );
                }
                console.log(`Updated permissoes: ${permissoes}`);
              }}
              className="border-zinc-500 bg-white mr-2"
            />
            {"   "}
            <label
              htmlFor={profile.type + index}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {profile.type}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssociaPermissao;
