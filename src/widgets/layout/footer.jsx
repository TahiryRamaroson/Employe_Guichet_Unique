import { Typography } from "@material-tailwind/react";

export function Footer() {

  return (
    <footer className="w-full bg-white p-8">
      <hr className="my-8 border-green-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2024 Admin Guichet Unique
      </Typography>
    </footer>
  );
}


export default Footer;
