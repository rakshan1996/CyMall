using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CyMall.Controllers
{
    public class pageController : ApiController
    {
        public IEnumerable<product> Get()
        {
            using (CyMallEntities1 entities = new CyMallEntities1())
            {
                return entities.products.ToList();
            }
        }
    }

    public class CategoriesController : ApiController
    {
        public IEnumerable<category> Get()
        {
            using (CyMallEntities1 entities = new CyMallEntities1())
            {
                return entities.categories.ToList();
            }
        }


    }

    public class BrandsController : ApiController
    {
        public IEnumerable<Brand> Get()
        {
            using (CyMallEntities1 entities = new CyMallEntities1())
            {
                return entities.Brands.ToList();
            }
        }
    }

    public class CartController : ApiController
    {
        public IEnumerable<cart> Get()
        {
            using (CyMallEntities1 entites = new CyMallEntities1())
            {
                return entites.carts.ToList();
            }
        }

        
        public void post([FromBody] cart cart_info)
        {
            using(CyMallEntities1 entities=new CyMallEntities1())
            {
                try
                {
                    entities.carts.Add(cart_info);
                    entities.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }

        }
        

        public void post(int id)
        {
            using (CyMallEntities1 entities = new CyMallEntities1())
            {
                var entity = entities.carts.First(e => e.product_id == id);
                
                if (entity.quantity > 0)
                {
                    entity.quantity = entity.quantity - 1;
                    entities.SaveChanges();
                }
            }
        }

        


    }
}
