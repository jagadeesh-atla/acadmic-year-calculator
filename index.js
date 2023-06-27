function addValueToArray(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] += value;
  }
  return arr;
}

function getFirstAcademicYear(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-based, so adding 1 to get the actual month

  // Determine the start and end years of the academic year
  let startYear, endYear;
  if (month >= 9) {
    startYear = year;
    endYear = year + 1;
  } else {
    startYear = year - 1;
    endYear = year;
  }

  // Return the first class academic year in the desired format
  return [startYear + 6, endYear + 6];
}

function toTitleCase(str) {
  return str.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
}

const ordinals = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
];

const addVal = (arr, val) => {
  return [arr[0] + val, arr[1] + val];
};

function handleSubmit() {
  let dob = document.getElementById("dob").value;
  if (dob != "") {
    dob = new Date(dob);

    const firstClass = getFirstAcademicYear(dob);

    const studyYears = [];

    for (let i = 0; i < 10; ++i) {
      const acadYears = addVal(firstClass, i);
      studyYears.push({
        class: toTitleCase(`${ordinals[i]} class`),
        acad: acadYears,
      });
    }
    // console.log(studyYears);

    let data = "";
    studyYears.forEach((ele) => {
      data += `<tr>
        <td>${ele.class}</td>
        <td>${ele.acad[0]} - ${ele.acad[1]}</td>
      </tr>`;
    });

    document.getElementById("listyears").innerHTML = data;
  } else {
    document.getElementById(
      "result"
    ).innerHTML = `<h2>Please enter a date...</h2>`;
  }
}
