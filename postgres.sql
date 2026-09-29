-- 1. TRIGGER PARA O UPDATED_AT
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW(); -- Atualiza a coluna do banco
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON "users"
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();


-- 2. TRIGGER PARA O DELETED_AT (SOFT DELETE)
CREATE OR REPLACE FUNCTION trigger_soft_delete()
RETURNS TRIGGER AS $$
BEGIN
  -- Se o registro foi marcado como deletado nesta atualização
  IF NEW.is_deleted = TRUE AND OLD.is_deleted = FALSE THEN
    NEW.deleted_at = NOW();
  -- Se o registro foi restaurado (reativado)
  ELSIF NEW.is_deleted = FALSE AND OLD.is_deleted = TRUE THEN
    NEW.deleted_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_soft_delete_users
BEFORE UPDATE ON "users"
FOR EACH ROW
EXECUTE FUNCTION trigger_soft_delete();