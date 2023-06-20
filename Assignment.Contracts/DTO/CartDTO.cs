namespace Assignment.Contracts.DTO
{
    public class CartDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int ProductPrice {get; set; }
        public string ProductCategory {get;set;}
        public string CartStatus { get; set; }
        public int ProductQuantity { get; set; }
        public string ProductImage {get;set;}
        public string UserName {get; set;}
    }
}
