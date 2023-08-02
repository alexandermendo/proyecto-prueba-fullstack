DECLARE @nomEmp VARCHAR(50) = '{NomEmp}';
DECLARE @apeEmp VARCHAR(50) = '{ApeEmp}';
DECLARE @paiEmp VARCHAR(50) = '{PaiEmp}';
DECLARE @imgEmp VARCHAR(50) = '{ImgEmp}';

INSERT INTO Employee (NomEmp, ApeEmp, PaiEmp, ImgEmp) VALUES (@nomEmp, @apeEmp, @paiEmp, @imgEmp)