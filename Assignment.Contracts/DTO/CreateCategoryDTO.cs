namespace Assignment.Contracts.DTO
{
    public class CreateCategoryDTO
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public string CategoryDescription { get; set; }
        public string CategoryAddedOn {get; set;}
    }
}
