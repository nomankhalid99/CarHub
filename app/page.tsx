import { CarCard, CustomFilter, SearchBar } from "@/components";
import Hero from "@/components/Hero";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";


export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer : searchParams.manufacturer || "",
    year : searchParams.year || 2022,
    fuel : searchParams.fuel || "",
    limit : searchParams.limit || 40,
    model : searchParams.model || "",
  });
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1  || !allCars;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="flex flex-col items-start justify-start gap-y-2.5 text-black-100">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the car you might like</p>
        </div>
        <div className="mt-12 w-full flex-between items-center flex-wrap gap-5">
          <SearchBar/>
          <div className="flex justify-start flex-wrap items-center gap-2">
            <CustomFilter title="fuel"/>
            <CustomFilter title="year"/>
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className=" grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14">
              {allCars.map((car) => (
                <CarCard car={car}/>
              ))}
            </div>
          </section>
        ) : (
          <div className="mt-16 flex justify-center items-center flex-col gap-2">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
