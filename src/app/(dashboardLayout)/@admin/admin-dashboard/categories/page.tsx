import AllCategories from "@/components/modules/medicine/AllCategories";
import { medicineService } from "@/services/medicine.service";
export const dynamic = "force-dynamic";
export default async function AllCategoriesPage() {
  const { data: category } = await medicineService.getAllCategories();
  console.log("From category page", category);
  return (
    <div>
      {/* <h1>all category</h1> */}
      <AllCategories category={category} />
    </div>
  );
}
