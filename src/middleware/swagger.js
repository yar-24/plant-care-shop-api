/**
 * @swagger
 * /v2/users/register:
 *   post:
 *     summary: Register User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:     
 *             type: object
 *             properties:
 *               fisrtname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                  type: String
 *               password:
 *                  type: String
 *             example:   # Sample object
 *               fisrtname: valntino
 *               lastname: rossi
 *               email: valentino@gmail.com 
 *               password: 12345
 *     responses:
 *       200:
 *         description: Register Success
 *       422:
 *         description: Please add all fields/Email sudah ada
 *       400:
 *          description: Invalid user data
 */

/**
 * @swagger
 * /v2/users/login:
 *   post:
 *     summary: Login User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:     
 *             type: object
 *             properties:
 *               email:
 *                  type: String
 *               password:
 *                  type: String
 *             example:   # Sample object
 *               email: valentino@gmail.com 
 *               password: 12345
 *     responses:
 *       200:
 *         description: Login Success
 *       400:
 *          description: Invalid credentials
 */

/**
 * @swagger
 * /v2/users/:id:
 *   delete:
 *     summary: Delete User
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 *       400:
 *          description: error
 */

/**
 * @swagger
 * /v2/users/:id:
 *   post:
 *     summary: Get User id
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:     
 *             type: object
 *             properties:
 *               _id:
 *                  type: objectId(id)
 *               fisrtname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                  type: String
 *               password:
 *                  type: String
 *             example:   # Sample object
 *               _id: 123456788900
 *               fisrtname: valntino
 *               lastname: rossi
 *               email: valentino@gmail.com 
 *               password: 12345
 *     responses:
 *       200:
 *         description: Register Success
 *       422:
 *         description: Please add all fields/Email sudah ada
 *       400:
 *          description: Invalid user data
 */

/**
 * @swagger
 * /v2/products/:
 *   post:
 *     summary: Post Product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:     
 *             type: object
 *             properties:
 *               _id:
 *                 type: object(id)
 *               user:
 *                 type: object(id)
 *               namePlant:
 *                 type: string
 *               centimeters:
 *                  type: string
 *               titleLike:
 *                  type: string
 *               descLike:
 *                  type: string
 *               idProduct:
 *                  type: object
 *               conditions:
 *                  type: String
 *               care:
 *                  type: String
 *               price:
 *                  type: integer
 *               idImageProduct:
 *                  type: String
 *               plantAbout:
 *                  type: String
 *               plantTipe:
 *                  type: String
 *               plantEnvironment:
 *                  type: String
 *               plantLight:
 *                  type: String
 *               plantBenefit:
 *                  type: String
 *               productTipe:
 *                  type: String
 *     responses:
 *       200:
 *         description: Berhasil diinput
 *       422:
 *         description: Gambar harus diupload!!
 *       400:
 *          description: Invalid user data
 */


/**
 * @swagger
 * /v2/products/:id:
 *   put:
 *     summary: Update Preduct
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:     
 *             type: object
 *             properties:
 *               _id:
 *                 type: object(id)
 *               user:
 *                 type: object(id)
 *               namePlant:
 *                 type: string
 *               centimeters:
 *                  type: string
 *               titleLike:
 *                  type: string
 *               descLike:
 *                  type: string
 *               idProduct:
 *                  type: object
 *               conditions:
 *                  type: String
 *               care:
 *                  type: String
 *               price:
 *                  type: integer
 *               idImageProduct:
 *                  type: String
 *               plantAbout:
 *                  type: String
 *               plantTipe:
 *                  type: String
 *               plantEnvironment:
 *                  type: String
 *               plantLight:
 *                  type: String
 *               plantBenefit:
 *                  type: String
 *               productTipe:
 *                  type: String
 *     responses:
 *       200:
 *         description: Berhasil diupdate
 *       422:
 *         description: Gambar harus diupload!!
 *       400:
 *          description: Invalid user data
 */

/**
 * @swagger
 * /v2/products/:id:
 *   delete:
 *     summary: Delete Product
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Berhasil dihapus
 *       400:
 *          description: Invalid user data
 */