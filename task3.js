$(document).ready(function () {
    // Function to fetch data from the server and display it
    function fetchData() {
        $.ajax({
            url: "http://localhost:3000/get", // Adjust this URL to match your API endpoint
            type: "GET",
            success: function (response) {
                console.log(response);

                // Clear the table body before appending new data
                $("#table-body").empty();

                response.data.forEach(function (student) {
                    const row = `
                        <tr>
                            <td>${student.id}</td>
                            <td>${student.name}</td>
                            <td>${student.age}</td>
                            <td>${student.grade}</td>
                            <td>${student.email}</td>
                        </tr>`;
                    $("#table-body").append(row);
                });
            },
            error: function (error) {
                console.error("Error fetching data:", error);
            }
        });
    }

    // Initial data fetch when the page loads
    fetchData();

    // Clear table and input fields when the "Clear" button is clicked
    $("#clear").click(function () {
        // Optionally, you can make an AJAX call to delete all data if required
        $.ajax({
            url: "http://localhost:3000/delete",
            type: "DELETE",
            success: function (response) {
                console.log("All data deleted successfully:", response);
                $("#table-body").empty(); // Clear the table on the client side
            },
            error: function (error) {
                console.error("Error deleting data:", error);
            }
        });


    });

    // Submit form data to the server when the "Submit" button is clicked
    $("#submit").click(function (event) {
        event.preventDefault();

        const name = $("#name-data").val();
        const age = $("#age-data").val();
        const grade = $("#grade-data").val();
        const email = $("#email-data").val();
        const value = { name: name, age: age, grade: grade, email: email };
        console.log(value);

        $.ajax({
            url: "http://localhost:3000/post", // Adjust this URL to match your API endpoint
            type: "POST",
            data: JSON.stringify(value),
            contentType: "application/json",
            success: function (response) {
                console.log(response);

                // Clear the table body and append the updated data
                $("#table-body").empty();

                response.data.forEach(function (student) {
                    const row = `
                        <tr>
                            <td>${student.id}</td>
                            <td>${student.name}</td>
                            <td>${student.age}</td>
                            <td>${student.grade}</td>
                            <td>${student.email}</td>
                        </tr>`;
                    $("#table-body").append(row);
                });

                // Clear the input fields after submission
                $("#name-data").val("");
                $("#age-data").val("");
                $("#grade-data").val("");
                $("#email-data").val("");
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});
