export function ErrorHandling(res: Response) {
  if (res.ok) return;

  switch (res.status) {
    case 400:
      alert("Input salah");
      break;
    case 401:
      alert("Unauthorized");
      break;
    case 403:
      alert("Forbidden");
      break;
    case 404:
      alert("Data tidak ditemukan");
      break;
    case 500:
      alert("Server error");
      break;
    default:
      alert(`Error: ${res.status}`);
  }
}
