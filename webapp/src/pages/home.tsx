import { useTransactionsMutations } from "@/mutations/useTransactionsMutations";
import { ReadTransactionDto } from "@/util";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format } from "date-fns";
import { useEffect } from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";



export default function HomePage() {

  const {getAllTransactions, getCategoriesCount, getTransactionsBetweenDates} = useTransactionsMutations();
  const {data} = getAllTransactions;
  const {data: categoriesCount} = getCategoriesCount;
  const {mutateAsync} = getTransactionsBetweenDates;


  useEffect(() => {
    const fetchData = async () => {
      await mutateAsync({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 Tage vorher
        endDate: new Date(),
      });
    };
    fetchData();
  }, [mutateAsync]);
  

  const sumAmountsPerDay = (transactions: ReadTransactionDto[]) => {
    const grouped: Record<string, number> = {};
  
    transactions?.forEach((t) => {
      const day = (t?.date || "").split("T")[0];
      if(day){
        grouped[day] = (grouped[day] || 0) + t.amount;
      }
    });
  
    return Object.entries(grouped)
      .map(([date, total]) => ({ date, total: Math.round(total * 100) / 100 }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  const dailySums = data ? sumAmountsPerDay(data) : [];

  const pieData = (categoriesCount || [] ).map((categoryCount)=>{
    return {
      name: categoryCount.category?.title,
      value: categoryCount.count
    }
  })

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

    return (
      <div>
        <div className="flex gap-10 p-10">
        <div className="w-full aspect-[2/1]">
          <ResponsiveContainer width="100%" height="100%">
          <PieChart width={500} height={200}>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={80}
              label={(entry) => {
                return `${entry.name}: ${entry.value}`
              }}
            >
              {pieData.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          </ResponsiveContainer>
          </div>
    
          <div className="w-full aspect-[2/1]">
          <ResponsiveContainer width="100%" height="100%">
          <LineChart width={300} height={200} data={dailySums}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip contentStyle={{ color: "red", backgroundColor: "black" }}/>
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
          </LineChart>
          </ResponsiveContainer>
          </div>

          
        </div>
        <div className="p-10">
          <div className="border p-2 rounded ">
          <h3>Letzte 5 Transaktionen</h3>
          <div className="flex justify-center">
          <TableContainer className='flex-1 overflow-auto'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Betrag</strong></TableCell>
                            <TableCell><strong>Datum</strong></TableCell>
                            <TableCell><strong>Kategorie</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(data || []).slice(0, 5).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.amount}</TableCell> 
                                <TableCell>{row.date ? format(row.date, 'dd.MM.yyyy') : '-'}</TableCell>
                                <TableCell>{row.category?.title}</TableCell> 
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </div>
        </div>
        </div>
      );
}