export const formatDateString = (dateString) => {
  const date = new Date(dateString);

  // Options for formatting
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  // Split the date into parts, capitalize the month, and join with hyphens
  const parts = formattedDate.replace(",", "").split(/\s+/);
  parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1).toLowerCase();
  
  return parts.join("-");
};


  export const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    // Custom options for the date part (year, month, day)
    const dateOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
  
    // Format the date part
    const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(date);
  
    // Custom options for the time part (hour, minute, AM/PM)
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
  
    // Format the time part
    let formattedTime = date.toLocaleTimeString('en-GB', timeOptions);
    
    // Capitalize AM/PM and remove the second occurrence of the time
    formattedTime = formattedTime.replace(/([apm]{2})/i, (match) => match.toUpperCase());
  
    // Combine the date and time into the desired format
    return `${formattedDate}, ${formattedTime}`;
  };
  


 export const getDeliveryDate = (dates, days) => {
    days = isNaN(Number(days)) ? 5 : Number(days);
    const futureDate = new Date(dates);
    futureDate.setDate(futureDate.getDate() + days);
    const formattedDate = futureDate.toLocaleString('en-US', { weekday: 'long', month: 'short',day: 'numeric' });
    return formattedDate;
  };
