export function ErrorHandling(res: Response) {
  console.log("halohalo: ", res);

  switch (res.status) {
    case 204:
      alert("Data tidak ditemukan");
      break;
    case 400:
      alert("Input salah, pastikan mengisi input dengan benar");
      break;
    case 500:
      alert("Server error");
      break;
    default:
      break;
  }
}
