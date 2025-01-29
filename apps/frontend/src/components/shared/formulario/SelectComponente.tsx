import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export default function SelectComponente() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Escolha" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Permissões</SelectItem>
        <SelectItem value="dark">Perfis</SelectItem>
      </SelectContent>
    </Select>
  );
}
