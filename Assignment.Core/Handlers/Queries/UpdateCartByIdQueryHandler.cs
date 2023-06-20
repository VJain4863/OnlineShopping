
using MediatR;
using Assignment.Contracts.DTO;
using Assignment.Contracts.Data;
using Assignment.Core.Exceptions;
using AutoMapper;

namespace Assignment.Providers.Handlers.Queries
{
    public class UpdateCartByIdQuery : IRequest<AppDTO>
    {
        
       
    }

    public class UpdateCartByIdQueryHandler : IRequestHandler<UpdateCartByIdQuery, CartDTO>
    {
        private readonly IUnitOfWork _repository;
        private readonly IMapper _mapper;

        public UpdateCartByIdQuery(IUnitOfWork repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<CartDTO> Handle(string cartStatus, int productId, CancellationToken cancellationToken)
        {
            var courseToUpdate = await _repository.Cart.FirstOrDefaultAsync(c => c.ProductId == ProductId); 
if (await TryUpdateModelAsync<CartDTO>(courseToUpdate, "", c=>c.cartStatus)) 
{ 
    try { await _repository.SaveChangesAsync(); } 
    catch (DbUpdateException /* ex */) 
    { 
        //Log the error (uncomment ex variable name and write a log.) ModelState.AddModelError("", "Unable to save changes. " + 
    //
    //"Try again, and if the problem persists, " + "see your system administrator."); } return RedirectToAction(nameof(Index)); } 
    //PopulateDepartmentsDropDownList(courseToUpdate.DepartmentID); return View(courseToUpdate); 
    
}
           

            return _mapper.Map<CartDTO>(app);
        }
    }
}

