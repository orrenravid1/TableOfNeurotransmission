using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using CsvHelper;
using System.Data;
using System.Globalization;
using System.IO;
using System.Text;
using static UnityEngine.Rendering.DebugUI;
using System;

namespace TON.Tests.ReadKiDBCSV
{
    public class ReadKiDBCSV : MonoBehaviour
    {
        private DataTable KiDataTable = new DataTable();
        private void Start()
        {
            string filePath = Path.Combine(Application.streamingAssetsPath, "KiDatabase.csv");
            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                // Do any configuration to `CsvReader` before creating CsvDataReader.
                using (var dr = new CsvDataReader(csv))
                {
                    KiDataTable.Load(dr);
                }
            }
            KiDataTable.Columns.Add("pki Val", typeof(double));
            foreach (DataRow row in KiDataTable.Rows)
            {
                double ki = Convert.ToDouble(row["ki Val"]);
                double pKi = -Math.Log10(ki * 1e-9); // Convert Ki (nM) to Molar, then calculate pKi
                row["pki Val"] = pKi;
            }
            //foreach(DataColumn col in KiDataTable.Columns)
            //{
            //    print(col.ColumnName);
            //}
            PrintTable(KiDataTable, columns: new List<string>() { "Name", " Ligand Name", "pki Val" }, numRows: 10);
            var view = new DataView(KiDataTable);
            string ligand = "Lyserg%";
            view.RowFilter = $"species = 'HUMAN' AND [ Ligand Name] LIKE '{ligand}' AND [pki Val] > 5";
            print("-------------");
            PrintView(view, columns: new List<string>() { "Name", " Ligand Name", "pki Val", "species" });
        }

        private void PrintView(DataView view, List<string> columns = null, int numRows = -1)
        {
            if (numRows < 0)
            {
                numRows = view.Count;
            }

            if (columns == null)
            {
                columns = new List<string>();
                foreach (DataColumn col in view.Table.Columns)
                {
                    columns.Add(col.ColumnName);
                }
            }

            StringBuilder sb = new StringBuilder();
            int rowCount = 0;
            foreach (DataRowView row in view)
            {
                foreach (var column in columns)
                {
                    sb.Append($"{column}: {row[column]}, ");
                }
                sb.Remove(sb.Length - 2, 2);
                sb.Append('\n');
                rowCount++;
                if (rowCount > numRows)
                {
                    break;
                }
            }
            print(sb.ToString());
        }

        private void PrintTable(DataTable table, List<string> columns = null, int numRows = -1)
        {
            PrintView(new DataView(table), columns, numRows);
        }
    }
}

