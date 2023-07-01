import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

// export const useCountry = (name) => {
//   const [country, setCountry] = useState(null);

//   useEffect(() => {
//     const lcName = name.toLowerCase();
//     axios
//       .get(`${baseUrl}/${lcName}`)
//       .then((res) => {
//         if (res.data) {
//           setCountry({
//             data: res.data,
//             found: true,
//             error: null,
//             isLoading: false,
//           });
//         } else {
//           setCountry({
//             data: null,
//             found: false,
//             error: "Country not found",
//             isLoading: false,
//           });
//         }
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }, [name]);

//   return country;
// };
