export function ErrorHandling(res: Response) {
  console.log("halohalo: ", res)

  switch (res.status) {
    case 400:
      alert("Input salah, pastikan mengisi input dengan benar")
      break;
    default:
      break;
  }

}
