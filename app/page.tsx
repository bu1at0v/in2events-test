import Link from "next/link";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8">
        <div className="">
          <p className="font-bold text-xl font-[family-name:var(--font-geist-mono)] mb-5">
            Test assignment for frontend position by V. Bulatov
          </p>
          <p className="text-lg font-[family-name:var(--font-geist-mono)]">
            The assignment was interesting and touching different points of
            development, i liked it.
          </p>
        </div>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>
            Table was restructured a bit on a small screen and i show only the
            most important information.
          </li>
          <li>
            If you click on the item in the table it will show you full details.
          </li>
          <li>All styled with tailwind.</li>
          <li>
            Adding new user to the list was implemented with validations and
            modal form.
          </li>
          <li>
            Avatar loading is implemented with basic file upload and base64
            format.
          </li>
          <li>
            Search feature is using debounce to avoid the unnecessary requests
            to server with the clear search button.
          </li>
          <li>
            Sorting feature is implemented with clear and understandable
            indication to the end user that sorting is possible on a few columns
            and when sorting is enabled - how it sorts.
          </li>
          <li>
            <Link href="/users" className="text-orange-300">
              Check out the users page
            </Link>
          </li>
        </ol>
      </main>
    </div>
  );
}
