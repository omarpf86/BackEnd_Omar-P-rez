import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
  async getAll() {
    try {
      const response = await ProductModel.find({});
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }


  async agregationPageLimitSort(name, page = 1, limit = 10, sort) {
    try {
      const filter = name ? { 'name': name } : {};
      let sortOrder = {};
      if (sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
      const paginateResponse = await ProductModel.paginate(filter, { page, limit, sort: sortOrder }) // sort: { price: 1 } 
      
      const status = paginateResponse ? 'Status (201): Products found' : 'Status (505):Products not found'
      const next = paginateResponse.hasNextPage ? `http://localhost:8080/products/complex?page=${paginateResponse.nextPage}` : null
      const prev = paginateResponse.hasPrevPage ? `http://localhost:8080/products/complex?page=${paginateResponse.prevPage}` : null
      return ({
        status,
        results: paginateResponse.docs,
        info: {
          count: paginateResponse.totalDocs,
          pages: paginateResponse.totalPages,
          next,
          prev
        }
      })
    } catch (error) {
      throw new Error(error);
    }
  }

  /*async agregationPageLimitSort(name, page=1, limit=10,sort) {
    try {
      const paginateResponse = await ProductModel.paginate({}, { page, limit })
      const productList = paginateResponse.docs.map((x) => x._id)
      const order = sort === 'desc' ? -1 : 1;
      const responseAgregation = await ProductModel.aggregate([
        {
          $match: {
            _id: {$in:productList},
            name: `${name}`
          }
        
        },
        {
          $sort: {
            price: order
          },
        }
      ])
      return responseAgregation;
    } catch (error) {
      throw new Error(error);
    }
  }*/

  async getById(id) {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

}














