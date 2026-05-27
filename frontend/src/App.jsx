import axios from "axios"
import { useEffect, useState } from "react"

function App() {

  const [records, setRecords] = useState([])

  const totalRecords = records.length

  const approvedRecords = records.filter(
    (record) => record.status === "APPROVED"
  ).length

  const flaggedRecords = records.filter(
    (record) => record.status === "FLAGGED"
  ).length

  const fetchRecords = async () => {

    const response = await axios.get(
      "http://127.0.0.1:8000/api/records/"
    )

    setRecords(response.data)
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  const handleSapUpload = async (event) => {

    const file = event.target.files[0]

    const formData = new FormData()
    formData.append("file", file)

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/sap/upload/",
        formData
      )

      alert(response.data.message)

      fetchRecords()

    } catch (error) {

      console.log(error)
      alert("Upload failed")

    }
  }

  const handleApprove = async (id) => {

    try {

      const response = await axios.post(
        `http://127.0.0.1:8000/api/approve/${id}/`
      )

      alert(response.data.message)

      fetchRecords()

    } catch (error) {

      console.log(error)
      alert("Approval failed")

    }
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          fontSize: "42px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "40px"
        }}
      >
        Breathe ESG Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px"
        }}
      >

        <div
          style={{
            flex: 1,
            backgroundColor: "#6366f1",
            color: "white",
            padding: "20px",
            borderRadius: "12px"
          }}
        >
          <h2>Total Records</h2>
          <h1>{totalRecords}</h1>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "#34d399",
            color: "white",
            padding: "20px",
            borderRadius: "12px"
          }}
        >
          <h2>Approved</h2>
          <h1>{approvedRecords}</h1>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "#f472b6",
            color: "white",
            padding: "20px",
            borderRadius: "12px"
          }}
        >
          <h2>Flagged</h2>
          <h1>{flaggedRecords}</h1>
        </div>

      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h2
          style={{
            fontSize: "28px",
            marginBottom: "20px"
          }}
        >
          SAP Upload
        </h2>

        <input
          type="file"
          onChange={handleSapUpload}
        />

      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h2
          style={{
            fontSize: "28px",
            marginBottom: "20px"
          }}
        >
          Emission Records
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >

          <thead>

            <tr style={{ backgroundColor: "#e5e7eb" }}>

              <th style={tableHeaderStyle}>Category</th>
              <th style={tableHeaderStyle}>Quantity</th>
              <th style={tableHeaderStyle}>Unit</th>
              <th style={tableHeaderStyle}>Emission</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Action</th>

            </tr>

          </thead>

          <tbody>

            {records.map((record) => (

              <tr key={record.id}>

                <td style={tableCellStyle}>
                  {record.category}
                </td>

                <td style={tableCellStyle}>
                  {record.quantity}
                </td>

                <td style={tableCellStyle}>
                  {record.unit}
                </td>

                <td style={tableCellStyle}>
                  {record.emission.toFixed(2)}
                </td>

                <td style={tableCellStyle}>

                  <span
                    style={{
                      backgroundColor:
                        record.status === "FLAGGED"
                          ? "#f472b6"
                          : record.status === "APPROVED"
                          ? "#38bdf8"
                          : "#34d399",

                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontWeight: "bold"
                    }}
                  >
                    {record.status}
                  </span>

                </td>

                <td style={tableCellStyle}>

                  <button
                    onClick={() => handleApprove(record.id)}
                    disabled={record.status === "APPROVED"}
                    style={{
                      backgroundColor:
                        record.status === "APPROVED"
                          ? "#94a3b8"
                          : "#6366f1",

                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      cursor:
                        record.status === "APPROVED"
                          ? "not-allowed"
                          : "pointer"
                    }}
                  >
                    {record.status === "APPROVED"
                      ? "Approved"
                      : "Approve"}
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

const tableHeaderStyle = {
  border: "1px solid #d1d5db",
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold"
}

const tableCellStyle = {
  border: "1px solid #d1d5db",
  padding: "12px"
}

export default App