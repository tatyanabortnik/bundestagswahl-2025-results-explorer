import { PARTY, PERCENTAGE, VOTES } from "@/domain/constants";
import type { PartyResult } from "@/domain/types";
import { toGermanNumber, toGermanPercent } from "@/domain/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";

export const PartyTable = ({ partyData }: { partyData: PartyResult[] }) => {
  return (
    <>
      <h3 className="text-lg font-bold mt-1">Ergebnisse im Detail</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{PARTY}</TableHead>
            <TableHead>{VOTES}</TableHead>
            <TableHead>{PERCENTAGE}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partyData.map((party) => (
            <TableRow>
              <TableCell className="font-medium">{party.party}</TableCell>
              <TableCell>{toGermanNumber(party.votes)}</TableCell>
              <TableCell>{toGermanPercent(party.percent)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
